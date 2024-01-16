import React, {useEffect} from "react";
import { Box,Grid, Typography, useMediaQuery } from "@mui/material";
import imgExample from "../../assets/exampleEmpresa.svg"
import { useLocation } from "react-router-dom";

import { DescriptionSuperAdmin } from "./DescriptionSuperAdmin";
import { Lists } from "./List";

import { useDispatch, useSelector } from "react-redux";

import { getCompanies } from "../../state/actions/user";


export const Companies = ({user}) =>{

    const dispatch = useDispatch()
  

    useEffect(() => {
      dispatch(getCompanies());
      
    }, [dispatch]);
  
    const { companySlice } = useSelector((state) => state.companySlice);
   console.log(companySlice, "companias xD")

    const boxStyles = {display:"flex", justifyContent:"center"}
    const boxStyles2 = {display:"flex", justifyContent:"center",backgroundColor: "rgba(0, 0, 0, 0.5)", width:"90%", borderRadius:"60px"}
    const boxStyles3 = {display:"flex", background:"", minHeight:"550px", margin:"20px"}
    const GridNavStyle = {display:"flex", justifyContent:"center"}
    const boxStyles4 = {display:"flex", flexDirection:"column", width:"100%", }
    
  
    let camera = {
        description:"Aquí se podrá administrar y ver los datos de cada empresa con la que trabajamos, podremos ver desde el plan que tengan hasta los administradores de cada empresa.",
        area:"ENTRADA",
        tiempo:"15:45 PM",
        fecha:"27 / Mes / 2023"
    
    }

    let exampleEmpresas = [imgExample,imgExample,imgExample,imgExample,imgExample,imgExample,imgExample,imgExample,imgExample]
    
    const location = useLocation();
    console.log(location.pathname, "A")

    return(
        <>
        <Box
        data-aos="fade-top" data-aos-offset="-30" data-aos-duration={500}  data-aos-delay="400"
         sx={boxStyles}>
            <Box sx={boxStyles2}>
                <Grid container spacing={2} > 
                    <Grid item xs={12} md={4} sx={GridNavStyle}>
                        <Box sx={boxStyles3}>

                        <DescriptionSuperAdmin user={user} camera={camera}/>

                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8} sx={GridNavStyle}>
                       <Box sx={boxStyles4}>

                            <Lists companySlice={companySlice} />

                       </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        </>
    )
}