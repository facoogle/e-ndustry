import asyncio
import websockets
import json
import cv2
import os
from ultralytics import YOLO

async def detect(websocket, path):
    ruta_actual = os.getcwd()
    ruta_modelo_lentes = os.path.join(ruta_actual, "models", "best_lentes.pt")
    ruta_modelo_guantes = os.path.join(ruta_actual, "models", "best_guantes.pt")

    model_lentes = YOLO(ruta_modelo_lentes)
    model_guantes = YOLO(ruta_modelo_guantes)

    async for message in websocket:
        data = json.loads(message)
        ruta_camara = data['ruta_camara']

        cap = cv2.VideoCapture(ruta_camara)
        if not cap.isOpened():
            print("No se pudo abrir la cámara")
            continue

        ret, frame = cap.read()
        if not ret:
            print("No se pudo obtener el frame")
            continue

        resultados_lentes = model_lentes.predict(frame, imgsz=640, conf=0.50)
        resultados_guantes = model_guantes.predict(frame, imgsz=640, conf=0.50)

        # Aquí, convierte los resultados a un formato que pueda ser enviado a través de WebSocket
        # Por ejemplo, coordenadas de los objetos detectados, imágenes con anotaciones, etc.
        # Supongamos que `resultados` es el objeto que contiene estos datos
        resultados = {
            "lentes": resultados_lentes, # Asegúrate de convertir esto a un formato serializable
            "guantes": resultados_guantes # Asegúrate de convertir esto a un formato serializable
        }

        await websocket.send(json.dumps(resultados))

        cap.release()

# Configura el servidor WebSocket
start_server = websockets.serve(detect, "localhost", 8765)

# Inicia el bucle de eventos de asyncio
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
