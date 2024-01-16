import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { BackGround } from "../../components/BackGround";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"
import "./style.css"


export const Welcome = () => {

   const customTypographyStyle = {
        fontFamily: 'Sulphur Point, sans-serif',
        fontSize: '10vw',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        background: 'linear-gradient(180deg, #FFF 57.97%, rgba(255, 255, 255, 0.46) 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign:"center"
      };

      const buttonStyle = {
        width:"100%",
        maxWidth:"22.875rem",
        height: "3.5625rem",
        background:"#000",
        borderRadius: "1.25rem",
        color:"#0197F1",
        fontFamily:"Roboto",
        fontSize:"1.25rem",
        fontWeight:"700",
        textTransform: 'none', 
        flexShrink: 0,
        marginTop:"50px"
      }

  return (
    <>
    <BackGround>
        <Box sx={{ display:"flex",flexDirection:"column" }}>
            <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
            <img
            data-aos="fade-top" data-aos-offset="-30" data-aos-duration={1000}  data-aos-delay="450" 
             style={{width:"100%",maxWidth:"231px"}} src={logo} alt="Logo E-ndustry" />
            </Box>
            <Typography
            data-aos="fade-top" data-aos-offset="-30" data-aos-duration={1000}  data-aos-delay="800" 
             className="Welcome" sx={{fontSize:"10vw"}}>
                Bienvenido
            </Typography>
            <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
              <Link to="/login" style={{width:"100%", display:"flex", justifyContent:"center", textDecoration:"none"}}>
            <Button
            data-aos="fade-top" data-aos-offset="-30" data-aos-duration={1000}  data-aos-delay="1200" 
             style={buttonStyle}>
                Ingresar / Registrarse
            </Button>
            </Link>
            </Box>
        </Box>
    </BackGround>
    
    </>
  );
};