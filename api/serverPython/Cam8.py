from flask import Flask, render_template,request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import cv2
import threading
import base64
import os
import psycopg2
import time
from ultralytics import YOLO
from gtts import gTTS
import logging

# Configuración de la conexión a la base de datos
DATABASE_CONFIG = {
    'dbname': 'endustry',
    'user': 'postgres',
    'password': '1234',
    'host': 'localhost'
}

def get_camera_config():
    """Obtiene la configuración de las cámaras desde la base de datos PostgreSQL."""
    connection = None
    try:
        connection = psycopg2.connect(**DATABASE_CONFIG)
        cursor = connection.cursor()
        cursor.execute("SELECT id, url FROM camaras")
        camera_config = {row[0]: row[1] for row in cursor.fetchall()}
        return camera_config
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error al conectar a la base de datos: {error}")
    finally:
        if connection is not None:
            connection.close()

camera_threads = {}

def update_cameras_interval(interval=60):
    global camaras, camera_threads
    while True:
        try:
            new_cameras = get_camera_config()
            for key, value in new_cameras.items():
                if value == '0':
                    new_cameras[key] = 0
            print(new_cameras)
            # Iniciar hilos para nuevas cámaras
            for camera_id, camera_source in new_cameras.items():
                if camera_id not in camaras:
                    print(f"Iniciando captura para nueva cámara: {camera_id}")
                    camaras[camera_id] = camera_source
                    camera_thread = threading.Thread(target=capture_camera, args=(camera_source, camera_id))
                    camera_threads[camera_id] = camera_thread
                    camera_thread.start()

            # Detener hilos de cámaras eliminadas
            for camera_id in list(camaras):
                if camera_id not in new_cameras:
                    print(f"Deteniendo captura para cámara eliminada: {camera_id}")
                    # Agrega aquí la lógica para detener el hilo de forma segura
                    del camaras[camera_id]
                    # Asumiendo que tienes un método para detener el hilo de forma segura
                    camera_threads[camera_id].stop() # Este método debe ser definido
                    del camera_threads[camera_id]

        except Exception as e:
            print(f"Error al actualizar cámaras: {e}")
        time.sleep(interval)

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Iniciar la lista de cámaras con la configuración inicial de la base de datos
camaras = get_camera_config()
for key, value in camaras.items():
    if value == '0':
        camaras[key] = 0
print(camaras)

frame_buffer = {}
buffer_lock = threading.Lock()

ruta_actual = os.getcwd()
ruta_modelo_lentes = os.path.join(ruta_actual, "models", "best_lentes.pt")
ruta_modelo_guantes = os.path.join(ruta_actual, "models", "best_guantes.pt")

# Cargar los modelos de YOLO (ajusta las rutas según tus archivos de modelo)
model_guantes = YOLO(ruta_modelo_guantes)
model_lentes = YOLO(ruta_modelo_lentes)

def emit_audio_response(text):
    tts = gTTS(text, lang='es')
    tts.save("response.mp3")

    with open("response.mp3", "rb") as audio_file:
        encoded_audio = base64.b64encode(audio_file.read()).decode('utf-8')

    os.remove("response.mp3")
    socketio.emit('audio_reply', {'audio_data': encoded_audio, 'text': text})
    
def emit_gloves_audio_response(text):
    tts = gTTS(text, lang='es')
    tts.save("gloves_response.mp3")

    with open("gloves_response.mp3", "rb") as audio_file:
        encoded_audio = base64.b64encode(audio_file.read()).decode('utf-8')

    os.remove("gloves_response.mp3")
    socketio.emit('audio_reply', {'audio_data': encoded_audio, 'text': text})
    
    
camera_streaming_state = {camera_id: True for camera_id in camaras}  # Asumimos que inicialmente todas las cámaras están transmitiendo
camera_detection_state = {camera_id: False for camera_id in camaras}


def capture_camera(camera_source, camera_id):
    global frame_buffer, camera_streaming_state, camera_detection_state
    cap = None
    last_detection_time = None
    
    last_gloves_detection_time = None

    while True:
        if camera_streaming_state[camera_id]:
            if cap is None:
                cap = cv2.VideoCapture(camera_source)
                if not cap.isOpened():
                    print(f"No se pudo abrir la fuente de video para {camera_id}")
                    break

            success, frame = cap.read()
            if not success:
                print(f"Fallo al capturar desde la cámara {camera_id}")
                break

            if camera_detection_state[camera_id]:
                # Lógica de detección y procesamiento de frames
                resultados_lentes = model_lentes.predict(frame, imgsz=640, conf=0.60)
                clases_detectadas = []
                if resultados_lentes[0].boxes:
                    clases_detectadas = [resultados_lentes[0].names[int(i)] for i in resultados_lentes[0].boxes.cls]

                current_time = time.time()
                if 'glasses' in clases_detectadas:
                    print("Se detectó el objeto 'GLAAASESEEEEEEEEEEEEEEE'.")
                    last_detection_time = current_time
                else:
                    if current_time - last_detection_time >= 5:
                        print("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
                        emit_audio_response("No se detectaron lentes")
                        last_detection_time = current_time  # Reinicia el temporizador

                # Anotar frame con detecciones de lentes
                frame_lentes = resultados_lentes[0].plot()

                # Realizar predicciones para guantes
                resultados_guantes = model_guantes.predict(frame, imgsz=640, conf=0.55)
                clases_detectadas_guantes = []
                if resultados_guantes[0].boxes:
                    clases_detectadas_guantes = [resultados_guantes[0].names[int(i)] for i in resultados_guantes[0].boxes.cls]
                
                current_time_guantes = time.time()
                
                if 'Gloves' in clases_detectadas_guantes:
                    print("Se detectaron guantes.")
                    last_gloves_detection_time = current_time_guantes
                else:
                    if last_gloves_detection_time is not None and current_time_guantes - last_gloves_detection_time >= 5:
                        print("No se detectaron guantes después de un tiempo.")
                        emit_gloves_audio_response("No se detectaron guantes")
                        last_gloves_detection_time = current_time_guantes  # Reinicia el temporizador
                
                    
                # Anotar frame con detecciones de guantes
                frame_guantes = resultados_guantes[0].plot()

                # Combinar detecciones de lentes y guantes en un solo frame
                frame_combinado = cv2.addWeighted(frame_lentes, 0.5, frame_guantes, 0.5, 0)

                with buffer_lock:
                    frame_buffer[camera_id] = frame_combinado

                _, buffer = cv2.imencode('.jpg', frame_combinado)
                frame_encoded = base64.b64encode(buffer).decode('utf-8')
                socketio.emit('stream', {'image': frame_encoded, 'camera_id': camera_id})

        else:
            if cap is not None:
                cap.release()
                cap = None
            time.sleep(1)  # Espera si el streaming está desactivado

    if cap is not None:
        cap.release()


@app.route('/<camera_id>')
def show_camera(camera_id):
    if camera_id not in camaras:
        return "Cámara no encontrada", 404
    return render_template('camera_template.html', camera_id=camera_id)

@app.route('/activate_detection/<camera_id>', methods=['POST'])
def activate_detection(camera_id):
    data = request.get_json()
    if data and data.get('rol') == 'operador':
        camera_detection_state[camera_id] = True
        camera_streaming_state[camera_id] = True  # Activa el streaming
        return jsonify({"message": "Detección y streaming activados"}), 200
    else:
        return jsonify({"error": "Acceso denegado"}), 403

@app.route('/deactivate_detection/<camera_id>', methods=['POST'])
def deactivate_detection(camera_id):
    data = request.get_json()
    if data and data.get('rol') == 'operador':
        camera_detection_state[camera_id] = False
        camera_streaming_state[camera_id] = False  # Desactiva el streaming
        return jsonify({"message": "Detección y streaming desactivados"}), 200
    else:
        return jsonify({"error": "Acceso denegado"}), 403

@socketio.on('connect')
def handle_connect():
    print('Cliente conectado')

@socketio.on('disconnect')
def handle_disconnect():
    print('Cliente desconectado')

# Hilo para actualizar la lista de cámaras
update_thread = threading.Thread(target=update_cameras_interval, args=(60,))
update_thread.daemon = True
update_thread.start()

if __name__ == '__main__':
    for camera_id, camera_source in camaras.items():
        threading.Thread(target=capture_camera, args=(camera_source, camera_id)).start()

    socketio.run(app, host='0.0.0.0', port=5000)