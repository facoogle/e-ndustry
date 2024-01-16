#Importar ibrerias
from ultralytics import YOLO
import cv2

#leer el modelo

model = YOLO("./models/best_guantes.pt")

#Realizar captura de video

cap = cv2.VideoCapture(0)

#bucle
while True:
    #leer fotogramas
    ret, frame = cap.read()

    #leemos resultados
    resultados = model.predict(frame, imgsz = 640, conf=0.50)

    #mostrar resultados
    anotaciones = resultados[0].plot()
    #mostrar fotogramas

    cv2.imshow("Deteccion y segmentacion", anotaciones)

    #cerrar programa

    if(cv2.waitKey(1) == 27):
        break

cap.release()
cv2.destroyAllWindows()