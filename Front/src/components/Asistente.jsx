import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import socketIOClient from "socket.io-client";
import logoSaludo from "../assets/LogoSaludo.png";
import {useNavigate} from "react-router-dom"
import "./Asistente.css"

const ENDPOINT = "http://127.0.0.1:5002";
const socket = socketIOClient(ENDPOINT);

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'es-MX'; // Cambiar según el idioma deseado

export function Asistente({ name }) {
    const navigate = useNavigate();

    const imgSyle = { width: "79px", height: "79px", marginRight: "8px" };
    
    const boxStyle = { display: "flex", alignItems: "center" };
    const typographyStyle = { color: "#FFF", fontFamily: "Roboto", fontSize: "18px" };

    const [listening, setListening] = useState(false);
    const [message, setMessage] = useState(`Hola ${name}, presiona para activar Emma`);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const logoStyle = isSpeaking 
    ? { width: "100px", height: "100px", marginRight: "8px", transition: "all 0.5s ease" } 
    : { width: "79px", height: "79px", marginRight: "8px", transition: "all 0.5s ease" };


    const startListening = () => {
        recognition.start();
        setListening(true);
        setMessage('Emma:"Estoy activo!, te escucho"')
    };

    useEffect(() => {
        recognition.onend = () => {
            // Reiniciar automáticamente el reconocimiento de voz si se detiene
            if (listening) {
                console.log("Reiniciando el reconocimiento de voz...");
                recognition.start();
            }
        };

        socket.on("voice_reply", (data) => {
            setIsSpeaking(true);
            let audio = new Audio(`data:audio/mp3;base64,${data.audio_data}`);
            audio.play();
            audio.onended = () => {
                setIsSpeaking(false); // Deja de "hablar" cuando el audio termina
                console.log("La reproducción del audio ha terminado");
                // Aquí puedes añadir más lógica que se ejecutará cuando el audio termine
            };
            
            
            
            
            setMessage(data.text); // Actualizar el mensaje con la respuesta del servidor
            console.log("Texto de la respuesta:", data.text);
            

            if (data.text.includes("navegando a Dashboard")) {
                setTimeout(() => {
                    setMessage("En que mas puedo ayudar?")
                    navigate('/online/dashboard'); // Navega a /online/dashboard
                }, 3500);
              }
            if (data.text.includes("camaras") || data.text.includes("cámaras")) {
                setTimeout(() => {
                    setMessage("En que mas puedo ayudar?")
                    navigate('/'); // Navega a /online/dashboard
                }, 3500);
              }
            if (data.text.includes("lista de usuarios")) {
                setTimeout(() => {
                    setMessage("Que más necesitas?")
                    navigate('/online/users'); // Navega a /online/dashboard
                }, 3500);
              }
            if (data.text.includes("Bien, vamos a agregar")) {
                setTimeout(() => {
                    setMessage("Necesitas algo más?")
                    navigate('/online/newuser'); // Navega a /online/dashboard
                }, 3500);
              }

            if (data.text.includes("cerrando sesión")) {
                setTimeout(() => {
                    setMessage("Adiós!")
                    navigate('/online/logout'); // Navega a /online/dashboard
                }, 3500);
                setTimeout(() => {
                    localStorage.removeItem('userData'); // Eliminar el token del localStorage
                    window.location.href = '/'; // Navega a /online/dashboard
                }, 4000);

                
              }
            

        });

        return () => {
            recognition.onend = null;
            socket.off("voice_reply"); // Limpia el listener cuando el componente se desmonta
        };
    }, [listening]);

    recognition.onresult = (event) => {
        var last = event.results.length - 1;
        if (event.results[last].isFinal) {
            var transcript = event.results[last][0].transcript.trim();
            console.log("Transcript:", transcript);
            socket.emit('voice_command', transcript);
        }
    };

    return (
        <div>
            {listening ? (
                <Box sx={boxStyle}>
                <img 
                style={{
                    ...imgSyle,
                    animation: isSpeaking ? "pulse 1s infinite" : "none", // Aplica la animación pulse cuando isSpeaking es true
                }}
                onClick={startListening} src={logoSaludo} alt="Logo Saludo"  />
                <Typography sx={typographyStyle}>
                    {message}
                </Typography>
                </Box>
            ) : (
                <Box sx={boxStyle}>
                    <img 
                    style={{
                        ...imgSyle,
                        animation: isSpeaking ? "pulse 0.1s infinite" : "none", // Aplica la animación pulse cuando isSpeaking es true
                    }}
                    onClick={startListening} src={logoSaludo} alt="Logo Saludo"  />
                    <Typography sx={typographyStyle}>
                        {message}
                    </Typography>
                </Box>
            )}
        </div>
    );
}



