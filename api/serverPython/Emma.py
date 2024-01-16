from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, emit  # Asegúrate de importar emit aquí
from flask_cors import CORS
from gtts import gTTS
import os
import base64

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app) # Esto habilita CORS para todas las rutas
socketio = SocketIO(app, cors_allowed_origins="*") # Permite CORS para SocketIO de todas las fuentes

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)
    emit('reply', {'data': 'Respuesta del servidor'})
    
@socketio.on('voice_command')
def handle_voice_command(data):
    data_lower = data.lower()
    
    if 'hola emma' in data_lower or 'Hola Emma' in data_lower or 'hola Emma' in data_lower or 'Emma' in data_lower:
        response_text = "Hola, ¿Como puedo ayudarte?"
        tts = gTTS(response_text, lang='es')
        tts.save("response.mp3")
        
        with open("response.mp3", "rb") as audio_file:
            encoded_audio = base64.b64encode(audio_file.read()).decode('utf-8')

        os.remove("response.mp3")

        emit('voice_reply', {'audio_data': encoded_audio, 'text': response_text})
    
    if 'navegar a camaras' in data_lower or 'ir a camaras' in data_lower or 'camaras' in data_lower or 'ir cámaras' in data_lower or 'navegar a cámaras' in data_lower or 'cámara' in data_lower:
        response_text = "Navegando a las cámaras..."
        tts = gTTS(response_text, lang='es')
        tts.save("response.mp3")
        
        with open("response.mp3", "rb") as audio_file:
            encoded_audio = base64.b64encode(audio_file.read()).decode('utf-8')

        os.remove("response.mp3")

        emit('voice_reply', {'audio_data': encoded_audio, 'text': response_text})
        
    if 'salir' in data_lower or 'cerrar sesion' in data_lower or 'apagar' in data_lower or 'Cerrar Sesión' in data_lower or 'salir' in data_lower or 'cerrar' in data_lower:
        response_text = "Entendido, cerrando sesión..."
        tts = gTTS(response_text, lang='es')
        tts.save("response.mp3")
        
        with open("response.mp3", "rb") as audio_file:
            encoded_audio = base64.b64encode(audio_file.read()).decode('utf-8')

        os.remove("response.mp3")

        emit('voice_reply', {'audio_data': encoded_audio, 'text': response_text})
        
    if 'dashboard' in data_lower or 'datos' in data_lower or 'métricas' in data_lower:
        response_text = "Entendido, navegando a Dashboard..."
        tts = gTTS(response_text, lang='es')
        tts.save("response.mp3")
        
        with open("response.mp3", "rb") as audio_file:
            encoded_audio = base64.b64encode(audio_file.read()).decode('utf-8')

        os.remove("response.mp3")

        emit('voice_reply', {'audio_data': encoded_audio, 'text': response_text})
    
    if 'agregar usuario' in data_lower or 'nuevo' in data_lower:
        response_text = "Bien, vamos a agregar un nuevo usuario..."
        tts = gTTS(response_text, lang='es')
        tts.save("response.mp3")
        
        with open("response.mp3", "rb") as audio_file:
            encoded_audio = base64.b64encode(audio_file.read()).decode('utf-8')

        os.remove("response.mp3")

        emit('voice_reply', {'audio_data': encoded_audio, 'text': response_text})
    
    if 'usuarios' in data_lower or 'users' in data_lower or 'personas' in data_lower:
        response_text = "Navegando a la lista de usuarios..."
        tts = gTTS(response_text, lang='es')
        tts.save("response.mp3")
        
        with open("response.mp3", "rb") as audio_file:
            encoded_audio = base64.b64encode(audio_file.read()).decode('utf-8')

        os.remove("response.mp3")

        emit('voice_reply', {'audio_data': encoded_audio, 'text': response_text})
        
    if 'agregar' in data_lower or 'nuevo' in data_lower:
        response_text = "Bien, vamos a agregar un nuevo usuario..."
        tts = gTTS(response_text, lang='es')
        tts.save("response.mp3")
        
        with open("response.mp3", "rb") as audio_file:
            encoded_audio = base64.b64encode(audio_file.read()).decode('utf-8')

        os.remove("response.mp3")

        emit('voice_reply', {'audio_data': encoded_audio, 'text': response_text})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5002)