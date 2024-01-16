import React from "react";
import logoSaludo from "../assets/LogoSaludo.png"
import { Box, Typography } from "@mui/material";
import { Asistente } from "./Asistente";

export const Saludo = ({name}) =>{
    const boxStyle = {display:"flex", alignItems:"center"}
    
    

    return(
        <>
        <Box sx={boxStyle}>
            
            <Asistente name={name}/>
            
        </Box>
        </>
    )
}