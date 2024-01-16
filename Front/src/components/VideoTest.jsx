import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import io from 'socket.io-client';


export const VideoStream = () => {
    const apiUrl = import.meta.env.VITE_API_PYTHON_URL;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'es-MX'; // Cambiar según el idioma deseado

    
    const [imageSrc, setImageSrc] = useState('');
    const cameraId = "0e4e9cfd-9c59-4b92-9c50-316a87534c37"


    

    useEffect(() => {
        const socket = io(`${apiUrl}`);

        socket.on('stream', data => {
            if (data.camera_id === cameraId) {
                setImageSrc(`data:image/jpeg;base64,${data.image}`);
            }
        });

        return () => socket.disconnect();
    }, [cameraId]);


    


    useEffect(() => {

        const socket = io(`${apiUrl}`);
       

        socket.on("audio_reply", (data) => {
            
            let audio = new Audio(`data:audio/mp3;base64,${data.audio_data}`);
            audio.play();
            audio.onended = () => {
                 // Deja de "hablar" cuando el audio termina
                console.log("La reproducción del audio ha terminado");
                
            };
            
            
            
            
            //setMessage(data.text); // Actualizar el mensaje con la respuesta del servidor
            console.log("Texto de la respuesta:", data.text);
        });

        return () => {
            recognition.onend = null;
            socket.off("voice_reply"); // Limpia el listener cuando el componente se desmonta
        };
    }, []);


//     useEffect(() => {

//         const activateDetection = async () => {
//             try {
//                 const response = await fetch(`${apiUrl}/activate_detection/${cameraId}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ rol: 'operador' }) // Enviar información del rol
//                 });
//                 if (!response.ok) {
//                     throw new Error(`Error: ${response.status}`);
//                 }
//             } catch (error) {
//                 console.error("Error al activar la detección:", error.message);
//             }
//         };
    
//         const deactivateDetection = async () => {
//     try {
//         const response = await fetch(`${apiUrl}/deactivate_detection/${cameraId}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ rol: 'operador' }) // Enviar información del rol
//         });
//         if (!response.ok) {
//             throw new Error(`Error: ${response.status}`);
//         }
//     } catch (error) {
//         console.error("Error al desactivar la detección:", error.message);
//     }
// };

        
    
//         activateDetection();

//         const handleBeforeUnload = () => {
//             deactivateDetection();
//         };
    
//         window.addEventListener('beforeunload', handleBeforeUnload);
    
//         return () => {
//             window.removeEventListener('beforeunload', handleBeforeUnload);

//             deactivateDetection();
//         };
//     }, [apiUrl, cameraId]);


    


    

    return (
        <div>
            <h3>Stream de Video</h3>
            <h6>Cámara ID {cameraId}</h6>
            {imageSrc?
            <img src={imageSrc} alt={`Video Stream - Cámara ${cameraId}`} style={{width:"100%", maxWidth:"640px", height:"460px"}} />
            :
            <div style={{display:"flex", justifyContent:"center", height:"100%"}}>
                <CircularProgress/>
            </div>
            }
        </div>
    );
};

