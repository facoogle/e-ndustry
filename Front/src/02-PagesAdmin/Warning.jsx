import React ,{ useState, useEffect } from "react";
import { useMediaQuery, Box, Typography, Grid } from "@mui/material";

//images
import iconTime from "../assets/time.svg"
import GuantesTrue from "../assets/GuantesTrue.png"
import GuantesFalse from "../assets/GuantesFalse.png"
import LentesTrue from "../assets/LentesTrue.png"
import LentesFalse from "../assets/LentesFalse.png"


import socketIOClient from "socket.io-client";

const apiPython ="http://localhost:5000";
const socket = socketIOClient(apiPython);

    

   
export const Warning = ({user,camera}) =>{

    

    const [warningExample, setWarningExample] = "Ninguna"
    const [colorWarning, setColorWarning] = "green"

    const is900 = useMediaQuery('(max-width:900px)');
    const boxStyles4 = {display:"flex", flexDirection:"column", width:"100%", }
    const boxStyles5 = {display:"flex", justifyContent:"end"}
    const typographyStyle2 = {color:"#FFF", fontFamily:"Roboto", fontSize:"25px", fontWeight:"300"}
    const typographyStyle3 = {color:"#FFF", fontFamily:"Roboto", fontSize:"18px", marginTop:"24px"}
    const typographyStyle4 = {color:"#FFF", fontFamily:"Roboto", fontSize:"16px", marginTop:"16px"}
    const typographyStyle5 = {color:"#FFF", fontFamily:"Roboto", fontSize:"16px"}
   
    const boxStyles6 = {display:"flex", justifyContent:"space-between"}
    const boxStyles7 = {display:"flex", alignItems:"center", flexDirection:"column", height:"100%"}
    const boxStyles8 = {display:"flex", backgroundImage:`url(${iconTime})`, backgroundSize: "cover", backgroundPosition: "center",width:"80px", height: "80px", alignItems:"center", justifyContent:"center", color:"white" }
    const typographyStyle = {fontFamily:"Roboto", color:"#FFF", fontWeight:"300", fontSize:"20px"}
    const GridNavStyle = {display:"flex", justifyContent:"center"}
const [war, setWar] = "Advertencia Peligro de seguridad Urgente:"



const [messages, setMessages] = useState({
    lentes: { message: "Todo funciona correctamente", image: LentesTrue },
    guantes: { message: "Todo funciona correctamente", image: GuantesTrue },
  });
  

const imageMapping = {
    lentes: {
      true: LentesTrue,
      false: LentesFalse,
    },
    guantes: {
      true: GuantesTrue,
      false: GuantesFalse,
    },
  };

  const addMessage = (type, message, image) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [type]: { message: message, image: image },
    }));

    // Eliminar el mensaje después de 5 segundos
    setTimeout(() => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [type]: { message: "Todo funciona correctamente", image: imageMapping[type].true },
      }));
    }, 5000);
  };



  useEffect(() => {
    socket.on("audio_reply", (data) => {
      console.log("Texto de la respuesta Warning:", data.text);

      if (data.text.includes("lentes")) {
        addMessage("lentes","No se detectaron Lentes", LentesFalse);
      }
      if (data.text.includes("guantes")) {
        addMessage("guantes","No se detectaron guantes", GuantesFalse);
      }
    });

    return () => {
      socket.off("audio_reply");
    };
  }, []);


  const renderMessages = () => {
    return Object.keys(messages).map((type, index) => (
      <div key={index} style={{marginTop:"40px"}}>
        <Box sx={{display:"flex", justifyContent:"space-between"}}>
           <Typography>{messages[type].message}</Typography>
            <img width={"50px"} src={messages[type].image} alt="imagen" /> 
        </Box>
        
      </div>
    ));
  };
    

    
    return(
        <>
        <Box sx={boxStyles4}>
                            <Box sx={boxStyles5}>
                                <Box sx={boxStyles5}>
                                   <Typography sx={typographyStyle}>
                                Nivel de riesgo: <span style={{color:"red"}}> Alto </span>
                                </Typography> 
                               
                                </Box>
                                
                               
                           </Box>
                           <Box sx={{marginTop:"40px"}}>
                           
                            <Grid container spacing={2} > 
                                <Grid item xs={12} md={8} sx={GridNavStyle}>
                                    <Box sx={boxStyles4}>
                                        <Typography sx={typographyStyle2}>
                                        Advertencia Peligro de seguridad Urgente:
                                        </Typography>
                                        {renderMessages()}
                                        <Typography sx={typographyStyle4}>
                                        ÁREA:  {camera.area}
                                        </Typography>
                                        <Typography sx={typographyStyle5}>
                                        TIEMPO:   {camera.tiempo}
                                        </Typography>
                                        <Typography sx={typographyStyle5}>
                                        FECHA:  {camera.fecha}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4} sx={GridNavStyle}>
                                        <Box sx={boxStyles7}>
                                        <Box sx={boxStyles8}>
                                            {user?.time}
                                        </Box>
                                        <Typography sx={{color:"white", textAlign:"center"}}>
                                            Tiempo del {user?.type} en la estación
                                        </Typography>
                                        </Box>
                                </Grid>

                                </Grid>
                           </Box>
                       </Box>
        </>
    )
}