import React, { Children, useEffect, useState } from "react";
import { BackGround } from "./BackGround";
import { Box, Grid } from "@mui/material";

//components
import { Saludo } from "./Saludo";
import { NavBar } from "./NavBar";


//images
import logo from "../assets/logo.png"
import { decodeJWT } from "../Utils/decodeJWT";

export const HeadNavBar = ({children}) =>{


    const [typeUser, setTypeUser] = useState("")

    const userData = localStorage.getItem('userData');
    const token = userData ? JSON.parse(userData).user : null;
    const decoded = token ? decodeJWT(token) : null;
    const decodedUser = decoded?.user;

    useEffect(() => {
        if (decodedUser) {
          if (decodedUser.superAdmin) {
            setTypeUser("superAdmin");
          } else if (decodedUser.admin) {
            setTypeUser("admin");
          } else {
            setTypeUser("operador");
          }
        }
      }, [decodedUser]);







    const boxStyles = { 
        display: "flex",
        flexDirection: "column",
        height:"100%", 
        width:"100%",
    }
    const boxStyles2 = {display:"flex", justifyContent:"center", width:"100%"}
    const logoStyle = {width:"160px", height:"46px"}
    const GridNavStyle = {display:"flex", justifyContent:"center"}
   
    return(
        <BackGround>
            
            <Box sx={boxStyles}>
                <Box sx={boxStyles2}>
                   <img src={logo} alt="Logo E-ndustry" style={logoStyle}/> 
                  
                </Box>
                
                <Box sx={boxStyles2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} sx={GridNavStyle}>
                            <Saludo name={typeUser}/>  {/* ASISTENTE "EMMA VOZ" SE ENCUENTRA AQUI  */}
                            
                         </Grid>
                        <Grid item xs={12} md={4}sx={GridNavStyle}>
                            <NavBar userType={typeUser}/>
                        </Grid>

                        <Grid item xs={12} md={4} sx={GridNavStyle}>
                        Contenido de la columna 3
                        </Grid>
                    </Grid>
                </Box>
                {children} 
            </Box>
        </BackGround>
    )
}