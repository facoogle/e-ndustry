from flask import Flask, render_template
from flask_socketio import SocketIO
import cv2
import threading
import base64
import os
import psycopg2
import time
from ultralytics import YOLO
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

def capture_camera(camera_source, camera_id):
    
    global frame_buffer
    cap = cv2.VideoCapture(camera_source)

    if not cap.isOpened():
        print(f"No se pudo abrir la fuente de video para {camera_id}")
        return

    while True:
        success, frame = cap.read()
        if not success:
            print(f"Fallo al capturar desde la cámara {camera_id}")
            break
        
        resultados_lentes = model_lentes.predict(frame, imgsz=640, conf=0.50)
        if resultados_lentes[0].boxes:
            clases_detectadas = [resultados_lentes[0].names[int(i)] for i in resultados_lentes[0].boxes.cls]

        # Verificar si 'good' está entre las clases detectadas
        if 'glasses' in clases_detectadas:
            print("Se detectó el objeto 'GLAAASESEEEEEEEEEEEEEEE'.")
        else:
            print("El objeto 'good' no fue detectado.")

        # Anotar frame con detecciones de lentes
        frame_lentes = resultados_lentes[0].plot()

        # Realizar predicciones para guantes
        resultados_guantes = model_guantes.predict(frame, imgsz=640, conf=0.50)
        
        # Anotar frame con detecciones de guantes
        frame_guantes = resultados_guantes[0].plot()

        # Combinar detecciones de lentes y guantes en un solo frame
        frame_combinado = cv2.addWeighted(frame_lentes, 0.5, frame_guantes, 0.5, 0)

        with buffer_lock:
            frame_buffer[camera_id] = frame_combinado

        _, buffer = cv2.imencode('.jpg', frame_combinado)
        frame_encoded = base64.b64encode(buffer).decode('utf-8')
        socketio.emit('stream', {'image': frame_encoded, 'camera_id': camera_id})

    cap.release()

@app.route('/<camera_id>')
def show_camera(camera_id):
    if camera_id not in camaras:
        return "Cámara no encontrada", 404
    return render_template('camera_template.html', camera_id=camera_id)

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

