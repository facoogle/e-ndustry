import React from "react";
import { useMediaQuery, Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";


import iconCam from "../../assets/iconCam.svg"
import iconUsers from "../../assets/Users.svg"
import iconNewUser from "../../assets/NewUser.svg"




    

   
export const DescriptionSuperAdmin = ({user,camera}) =>{

    const is900 = useMediaQuery('(max-width:900px)');
    const boxStyles4 = {display:"flex", flexDirection:"column", width:"100%", }
    const boxStyles5 = {display:"flex", justifyContent:"space-between", maxWidth: is900?"150px":"200px"}
    const typographyStyle2 = {color:"#FFF", fontFamily:"Roboto", fontSize:"24px", fontWeight:"500", marginTop:"-16px"}
    const typographyStyle3 = {color:"#FFF", fontFamily:"Roboto", fontSize:"18px", color:"green"}
    const typographyStyle4 = {color:"#FFF", fontFamily:"Roboto", fontSize:"16px", marginTop:"16px"}
    
    const imgStyles = {width:is900?"50px":"96px", height:is900?"50px":"96px",maxWidth:"100%", padding:"15px", background:"var(--BlueFlow, linear-gradient(180deg, #0197F1 0%, #014EA7 100%))", flexShrink:"0", borderRadius:"10px"}
    const imgStyles2 = {width:"45px", height:"45px",maxWidth:"100%", padding:"15px", background:"var(--BlueFlow, linear-gradient(180deg, #0197F1 0%, #014EA7 100%))", flexShrink:"0", borderRadius:"10px"}
    const boxStyles6 = {display:"flex", justifyContent:"space-between"}
    
    const typographyStyle = {fontFamily:"Roboto", color:"#FFF", fontWeight:"600", fontSize:"30px", marginBottom:"16px"}
    const GridNavStyle = {display:"flex", justifyContent:"center"}

    
    return(
        <>
        <Box sx={boxStyles4}>
                            <Box sx={boxStyles6}>
                                <Box sx={boxStyles4}>
                                   <Typography sx={typographyStyle}>
                                ¡Bienvenido!
                                </Typography> 
                                <Box sx={boxStyles5}>

<Link to="/online/companies"> <img src={iconCam} alt="IconCam" style={imgStyles} /> </Link>
<Link to="/online/newuserpanel"><img src={iconUsers} alt="IconUser" style={imgStyles2} /> </Link>
<Link to="/online/newcompany"> <img src={iconNewUser} alt="IconNewUser" style={imgStyles2} /> </Link>
                                    
                                    
                                    
                                </Box>
                                </Box>
                                
                                
                           </Box>
                           <Box sx={{marginTop:"40px"}}>
                           
                            <Grid container spacing={2} > 
                                <Grid item xs={12} md={12} sx={GridNavStyle}>
                                    <Box sx={boxStyles4}>
                                        <Typography sx={typographyStyle2}>
                                            {user.username}
                                        </Typography>
                                        <Typography sx={typographyStyle3}>
                                            {user.superAdmin?"Super Admin" : null}
                                            {user.admin?"Administrador" : null}
                                            {user.operador?"Operador" : null}
                                        </Typography>
                                        <Typography sx={typographyStyle4}>
                                            {camera.description}
                                        </Typography>
                                       
                                    </Box>
                                </Grid>
                                

                                </Grid>
                           </Box>
                       </Box>
        </>
    )
}