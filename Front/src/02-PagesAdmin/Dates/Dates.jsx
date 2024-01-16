import React from "react";
import { Box,Grid, Typography, useMediaQuery } from "@mui/material";







export const Dates = () =>{

   

    const boxStyles = {display:"flex", justifyContent:"center"}
    const boxStyles2 = {display:"flex", justifyContent:"center",backgroundColor: "rgba(0, 0, 0, 0.5)", width:"90%", borderRadius:"60px", padding:"40px",  minHeight:"550px"}
    
  
    


    return(
        <>
        <Box 
        data-aos="fade" data-aos-offset="-30" data-aos-duration={500}  data-aos-delay="200"
        sx={boxStyles}>
            <Box sx={boxStyles2}>
                <Typography sx={{fontSize:"50px", color:"white"}}>
                    DATOS A PASAR POR EL CLIENTE
                </Typography>
            </Box>
        </Box>
        </>
    )
}