import React from "react";
import { Box, Typography } from "@mui/material";
import imageBack from "../assets/imageBack.svg";


export const BackGround = ({ children }) => {
  return (
    
    <div style={{display:"flex",justifyContent:"center",height:"100%",background:"linear-gradient(180deg, #292929 0%, #141414 100%)"}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          minHeight:"100vh",
          //paddingTop:"10%",
          //paddingBottom:"10%",
          backgroundImage: `url(${imageBack})`, // Agregar imagen de fondo
          backgroundSize: "1200px", // Ajustar tamaño de la imagen
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat", // Evitar repetición de la imagen
          //position: "relative",
          
        }}
      >
       { children }
        
      </Box>
      </div>
    
  );
};