import { createTheme } from '@mui/material/styles';
import 'typeface-montserrat';

const theme = createTheme({
  typography: {
    fontFamily: ["sans-serif","Plus Jakarta Sans","Ubuntu","Rubik"], // Agrega la fuente Baloo
  },
  fontRubik:{
    fontFamily:"Rubik"
  }
  ,
  palette: {
    primary: {
      main: '#00D5FA',
    },
    secondary: {
      main: '#006B7D',
    },
    text: {
      primary: '#666666',
      secondary:'#FFFFFF'
    },
    background:{
        primary:"",
        secondary:"linear-gradient(95.88deg, #70C0B2 0%, #0198B6 29.4%, #007289 81.74%)"
    }
  },
});

export default theme;
