#Importar ibrerias
from ultralytics import YOLO
import cv2
import os
import sys

def main_function(ruta_camara):
    ruta_actual = os.getcwd()
    ruta_modelo_lentes = os.path.join(ruta_actual, "models", "best_lentes.pt")
    ruta_modelo_guantes = os.path.join(ruta_actual, "models", "best_guantes.pt")
    #leer el modelo

    model_lentes = YOLO(ruta_modelo_lentes)
    model_guantes = YOLO(ruta_modelo_guantes)

    #Realizar captura de video

    cap = cv2.VideoCapture(int(ruta_camara))

    # Bucle
    while True:
        # Leer fotogramas
        ret, frame = cap.read()

        # Realizar predicciones para lentes y guantes
        resultados_lentes = model_lentes.predict(frame, imgsz=640, conf=0.50)
        resultados_guantes = model_guantes.predict(frame, imgsz=640, conf=0.50)
        # Mostrar resultados para lentes
        anotaciones_lentes = resultados_lentes[0].plot()
        cv2.imshow("Deteccion de lentes", anotaciones_lentes)

        # Mostrar resultados para guantes
        anotaciones_guantes = resultados_guantes[0].plot()
        cv2.imshow("Deteccion de guantes", anotaciones_guantes)

        # Cerrar programa
        if cv2.waitKey(1) == 27:
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    ruta_camara = sys.argv[1]
    main_function(ruta_camara)
