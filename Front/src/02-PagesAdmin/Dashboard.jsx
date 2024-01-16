import React from "react";
import { useMediaQuery, Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import imgEmpresa from "../assets/exampleEmpresa.svg"
import iconCam from "../assets/iconCam.svg"
import iconUsers from "../assets/Users.svg"
import iconNewUser from "../assets/NewUser.svg"
import iconTime from "../assets/time.svg"
import iconExit from "../assets/Exit.svg"



    

   
export const Dashboard = ({user,camera}) =>{

    console.log(user, "JKAJAJAJAJ")

    const is900 = useMediaQuery('(max-width:900px)');
    const boxStyles4 = {display:"flex", flexDirection:"column", width:"100%", }
    const boxStyles5 = {display:"flex", justifyContent: user?.operador?"":"space-between", maxWidth: is900?"150px":"200px"}
    const typographyStyle2 = {color:"#FFF", fontFamily:"Roboto", fontSize:"24px", fontWeight:"500"}
    const typographyStyle3 = {color:user?.admin?"green":"orange", fontFamily:"Roboto", fontSize:"18px"}
    const typographyStyle4 = {color:"#FFF", fontFamily:"Roboto", fontSize:"16px", marginTop:"16px"}
    const typographyStyle5 = {color:"#FFF", fontFamily:"Roboto", fontSize:"16px"}
    const imgStyles = {width:is900?"50px":"96px", height:is900?"50px":"96px",maxWidth:"100%", padding:"15px", background:"var(--BlueFlow, linear-gradient(180deg, #0197F1 0%, #014EA7 100%))", flexShrink:"0", borderRadius:"10px"}
    const imgStyles2 = {width:"45px", height:"45px",maxWidth:"100%", padding:"15px", background:"var(--BlueFlow, linear-gradient(180deg, #0197F1 0%, #014EA7 100%))", flexShrink:"0", borderRadius:"10px"}
    const boxStyles6 = {display:"flex", justifyContent:"space-between"}
    const boxStyles7 = {display:"flex", alignItems:"center", flexDirection:"column", height:"100%"}
    const boxStyles8 = {display:"flex", backgroundImage:`url(${iconTime})`, backgroundSize: "cover", backgroundPosition: "center",width:"80px", height: "80px", alignItems:"center", justifyContent:"center", color:"white" }
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

<Link style={{marginRight:user?.operador?"8px":""}} to="/online/warnings"> <img src={iconCam} alt="IconCam" style={imgStyles} /> </Link>

<Link to={user?.admin?"/online/users":"/online/logout"}><img src={user?.admin?iconUsers:iconExit} alt="IconUser" style={imgStyles2} /> </Link>



{user?.admin?
    <Link to="/online/newuser"> <img src={iconNewUser} alt="IconNewUser" style={imgStyles2} /> </Link>
    :
    null
}

                                    
                                    
                                    
                                </Box>
                                </Box>
                                
                                <img src={imgEmpresa} alt="Empresa Image" style={{width:is900?"50px":"107px", height:is900?"50px":"100px"}} />
                           </Box>
                           <Box sx={{marginTop:"40px"}}>
                           
                            <Grid container spacing={2} > 
                                <Grid item xs={12} md={8} sx={GridNavStyle}>
                                    <Box sx={boxStyles4}>
                                        <Typography sx={typographyStyle2}>
                                            {user?.username}
                                        </Typography>
                                        <Typography sx={typographyStyle3}>
                                            {user?.admin?"Administrador":null}
                                            {user?.operador?"Operador":null}
                                        </Typography>
                                        <Typography sx={typographyStyle4}>
                                            {camera.description}
                                        </Typography>
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