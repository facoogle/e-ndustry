import React from 'react';
import { Box, Typography } from '@mui/material';


const MessageDisplay = ({ message,colorCamara }) => {
    return (
        
        <Box sx={{width:"100%",display:"flex", justifyContent:"center"}}>
            <Box sx={{width:"100%", maxWidth:"550px"}}>
               
                <Typography
                
                 sx={{textAlign:"center",color:colorCamara, fontSize:"26px",  marginTop:"-20vh"}}>
                {message}
            </Typography>
            </Box>
            
        </Box>
    )
};

export default MessageDisplay;
