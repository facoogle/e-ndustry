import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const CameraComponent = ({ onCapture, message,setMessage }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [progress, setProgress] = useState(false)

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true})
                .then(stream => {
                    videoRef.current.srcObject = stream;
                })
                .catch(err => console.error("Error accessing the camera: ", err));
        }
    }, []);

    const captureImage = () => {
        setMessage("")
        setProgress(true)
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        onCapture(canvas.toDataURL('image/png', 1.0));
        
    };

    useEffect(() => {
        // Convierte el mensaje a minúsculas para hacer comparaciones más flexibles
        const lowerCaseMessage = message.toLowerCase();
        if(lowerCaseMessage){
            setProgress(false)
        }
      }, [message]);

    return (
        
        <div className="d-flex flex-column align-items-center my-3" style={{borderRadius:"50%"}}>
            <video ref={videoRef} autoPlay style={{ maxWidth: '600px', width: '100%', borderRadius:"150px", border:"5px solid #0197F1" }} />
            <div style={{ height: '20px' }}></div> {}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {progress? <div style={{position:"absolute", marginTop:"20vh"}}>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <div style={{color:"white"}}>
                   Validando 
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                   <CircularProgress/> 
                </div>
                
                </div>
                
            </div>:null}
           
            
            <Button style={{color:"white", background:"blue", marginTop:"-7vh"}} variant="primary" onClick={captureImage}>Validar Rostro</Button>
        </div>
    );
};

export default CameraComponent;
