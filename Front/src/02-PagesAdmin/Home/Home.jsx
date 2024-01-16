import React from "react";
import { Box,Grid, Typography, useMediaQuery } from "@mui/material";
import imgExample from "../../assets/example.png"
import { useLocation } from "react-router-dom";

//Components
import { Dashboard } from "../Dashboard";
import { Warning } from "../Warning";
import { Close } from "../Close"
import { VideoStream } from "../../components/VideoTest";



export const Home = ({user}) =>{

   

    const boxStyles = {display:"flex", justifyContent:"center"}
    const boxStyles2 = {display:"flex", justifyContent:"center",backgroundColor: "rgba(0, 0, 0, 0.5)", width:"90%", borderRadius:"60px", padding:"40px"}
    const boxStyles3 = {display:"flex",   minHeight:"550px"}
    const GridNavStyle = {display:"flex", justifyContent:"center"}
    const boxStyles4 = {display:"flex", flexDirection:"column", width:"100%", }
    
    
    let camera = {
        description:"En esta linea se realizarán los procesos de ensamblado de las piezas A y B para posteriormente a la linea de ensamblaje 5",
        area:"ENTRADA",
        tiempo:"15:45 PM",
        fecha:"27 / Mes / 2023"
    
    }
    
    const location = useLocation();
    console.log(location.pathname, "A")
    console.log(user, " A VER ACA XD")

    const videoSrc = 'http://localhost:5000/video_feed/local';

    return(
        <>
        <Box 
        data-aos="fade" data-aos-offset="-30" data-aos-duration={500}  data-aos-delay="200"
        sx={boxStyles}>
            <Box sx={boxStyles2}>
                <Grid container spacing={2} > 
                    <Grid item xs={12} md={7} sx={GridNavStyle}>
                        <Box sx={boxStyles3}>
                        <VideoStream/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5} sx={GridNavStyle}>
                       <Box sx={boxStyles4}>

                        {location.pathname === "/online" || location.pathname === "/"? <Dashboard user={user} camera={camera}/> : null}
                        {location.pathname === "/online/warnings"? <Warning user={user} camera={camera}/> : null}
                        {location.pathname === "/online/logout"? <Close user={user} camera={camera}/> : null}
                       </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        </>
    )
}