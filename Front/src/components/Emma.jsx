import React, { useEffect, useState } from 'react';

export const Emma = () => {
  const [websocket, setWebsocket] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioStream, setAudioStream] = useState(null); // Nuevo estado para manejar el stream de audio

  useEffect(() => {
    // Establecer la conexión WebSocket
    const ws = new WebSocket('ws://127.0.0.1:8000/ws');
    ws.onopen = () => {
      console.log('WebSocket Connected');
      setWebsocket(ws);
    };
    ws.onmessage = (event) => {
      console.log('Mensaje recibido:', event.data);
      // Procesar la respuesta aquí
    };
    ws.onclose = () => console.log('WebSocket Disconnected');
    
    return () => {
      ws.close();
    };
  }, []);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setAudioStream(stream); // Guardar el stream de audio para poder cerrarlo más tarde
        const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        setMediaRecorder(recorder);
        recorder.start();
        setIsRecording(true);
  
        recorder.addEventListener("dataavailable", event => {
          if (websocket) {
            websocket.send(event.data);
          }
        });
      });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop()); // Cerrar el stream de audio
        setAudioStream(null); // Limpiar el estado del stream de audio
      }
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        Iniciar Grabación
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Detener Grabación
      </button>
    </div>
  );
};

