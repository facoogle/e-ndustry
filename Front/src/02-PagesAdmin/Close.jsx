import React from "react";
import { Box, Typography, Button } from "@mui/material";
import iconHome from "../assets/Home2.svg";
import iconExit from "../assets/Exit.svg";
import { Link } from "react-router-dom";
import { deactivateDetection } from "../state/actions/Operador";

export const Close = ({user}) =>{
    const BoxStyles1 = {display:"flex", flexDirection:"column"}
    const BoxStyles2 = {display:"flex", justifyContent:"center"}
    const TypographyStyle1 = {color:"white",fontSize:"30px", fontWeight:"600", fontFamily:"Roboto", textAlign:"center"}
    const buttonStyle = {
        width: "100%",
        background: "#0191E5",
        borderRadius: "15px",
        color: "#fff",
        fontFamily: "Roboto",
        fontSize: "18px",
        fontWeight: "700",
        textTransform: 'none',
        margin:"8px",
        display:"flex",
        alignItems:"center",
        textDecoration:"none",
        height:"36px"
        
        
      }
      

      const cerrarSesion = () => {
        if(user?.operador){
          deactivateDetection()   // Desactivamos la camara del operador al iniciar sesion
          setTimeout(() => {
          localStorage.removeItem("userData"); 
          window.location.href = "/";
          }, 3000);
          
          
          
        } else{
          localStorage.removeItem("userData");
          window.location.href = "/";
        }
        
      };
    
    
    return(
        <>
        <Box sx={BoxStyles1}>
            <Box sx={{BoxStyles2}}>
                <Typography sx={TypographyStyle1}>
                ¿Estás seguro que quieres salir?   
                </Typography>
            </Box>
            <Box sx={{display:"flex", justifyContent:"center"}}>
                <Link to="/" style={buttonStyle}>
                <Button type="submit" style={buttonStyle}>
                  Regresar
                  <img src={iconHome} alt="home" style={{width:"18px", marginLeft:"8px"}} />
                </Button>
                </Link>

                <Button onClick={cerrarSesion} type="submit" style={buttonStyle}>
                  Salir <img src={iconExit} alt="home" style={{width:"18px", marginLeft:"8px"}} />
                </Button>
            </Box> 
        </Box>

        </>
    )
}