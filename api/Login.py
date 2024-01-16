import sys
import cv2
import face_recognition
import numpy as np
import base64
from io import BytesIO
from PIL import Image
import requests

def es_tono_piel(parte_cara):
    imagen_hsv = cv2.cvtColor(parte_cara, cv2.COLOR_BGR2HSV)
    minimo = np.array([20, 30, 20], dtype="uint8")
    maximo = np.array([80, 255, 255], dtype="uint8")
    masc = cv2.inRange(imagen_hsv, minimo, maximo)
    mascara = cv2.bitwise_not(masc)
    #cv2.imshow("Mascara de Piel", mascara)
    #cv2.waitKey(0)
    porcentaje_piel = (cv2.countNonZero(mascara) / (parte_cara.size / 3)) * 100
    #print(porcentaje_piel)
    gris = cv2.cvtColor(parte_cara, cv2.COLOR_BGR2GRAY)
    brillo = np.mean(gris)
    #print(brillo)
    return porcentaje_piel > 50 and brillo < 70

def comparar_con_persona_en_imagen(credencial_cara_codificada, imagen):
    localizaciones_caras = face_recognition.face_locations(imagen)
    caras_codificadas = face_recognition.face_encodings(imagen, localizaciones_caras)

    for cara_codificada, ubicacion_cara in zip(caras_codificadas, localizaciones_caras):
        resultados = face_recognition.compare_faces([credencial_cara_codificada], cara_codificada)
        top, right, bottom, left = ubicacion_cara
        parte_cara = imagen[top:bottom, left:right]

        if True in resultados and es_tono_piel(parte_cara):
            return "Identidad verificada. Acceso permitido."
        elif True in resultados:
            return "Identidad correcta, pero esto es una imagen. Acceso denegado"
        else:
            return "Acceso denegado. Persona equivocada."

    return "No se encontraron caras en la imagen."

def procesar_imagen_b64(imagen_b64):
    imagen_b64 = imagen_b64.split(',')[1] 
    imagen_decodificada = base64.b64decode(imagen_b64)
    imagen = Image.open(BytesIO(imagen_decodificada))
    imagen = cv2.cvtColor(np.array(imagen), cv2.COLOR_RGB2BGR)
    return imagen

def descargar_imagen_desde_url(url):
    response = requests.get(url)
    if response.status_code == 200:
        imagen = np.asarray(bytearray(response.content), dtype="uint8")
        imagen = cv2.imdecode(imagen, cv2.IMREAD_COLOR)
        return imagen
    else:
        print(f"Tu imagen de perfil no funciona, el adminsitrador debera cambiarla")
        #print(f"Código de estado: {response.status_code}")
        return None

def ejecutar_reconocimiento(ruta_archivo,ruta_archivo2):
    imagen = face_recognition.load_image_file(ruta_archivo)
    url_imagen = ruta_archivo2
    imagen_url = descargar_imagen_desde_url(url_imagen)
    if imagen_url is not None:
        credencial_cara_codificada = face_recognition.face_encodings(imagen_url)[0]
        resultado = comparar_con_persona_en_imagen(credencial_cara_codificada, imagen)
        print(resultado)
    else:
        print(f"algo salio mal: {type(imagen_url)}.")

if __name__ == "__main__":
    ruta_archivo = sys.argv[1]
    ruta_archivo2 = sys.argv[2]
    ejecutar_reconocimiento(ruta_archivo,ruta_archivo2) 