import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Lists = ({companySlice}) =>{
    const apiUrl = import.meta.env.VITE_API_URL;
    
    
    return(
        <>
        <Grid container spacing={2}  style={{marginTop:"16px"}}> 
        {companySlice?.map((el)=>{
            return(
              <>
                <Grid item xs={6} md={2}>
                
                <Link to={`/online/userscompany/${el.id}`} style={{textDecoration:"none"}}>
                <img style={{width:"100%", maxWidth:"133px", height:"120px", borderRadius:"50%", border:el.emailVerified?"4px solid green":"4px solid red"}} src={el?.imagen} alt={el?.name} />
                <Typography sx={{textAlign:"center"}}>
                {el?.name}
                </Typography>
                </Link>
                </Grid>
                
                </>
            )
            
        })}
                    
         </Grid>

        </>
    )
}