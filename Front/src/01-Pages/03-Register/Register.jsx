import React, {useState} from "react";
import { Box, Typography, Button, useMediaQuery, TextField, FormControl, Checkbox } from "@mui/material";
import { BackGround } from "../../components/BackGround";
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

//images
import imgCam_1 from "../../assets/cam1.svg"


export const Register = () => {

  const validationSchema = Yup.object({
    email: Yup.string().email('Ingresa un correo electrónico válido').required('Debes colocar tu email'),
    password: Yup.string().matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/, 'Ingresa al menos 8 caracteres, 1 numero y caracter especial').required('Debes colocar tu contraseña'),
    user: Yup.string().required("Coloca un nombre usuario")
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      user:''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const is900 = useMediaQuery('(max-width:900px)');

  const customTypographyStyle = {
    fontFamily: 'Roboto',
    fontSize: is900 ? '30px' : '50px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    background: 'linear-gradient(180deg, #FFF 57.97%, rgba(255, 255, 255, 0.46) 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: "center"
  };

  const customTypographyStyle2 = {
    fontFamily: 'Roboto',
    fontSize: is900 ? '16px' : '20px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    background: 'linear-gradient(180deg, #FFF 57.97%, rgba(255, 255, 255, 0.46) 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: "center",

  };

  const customTypographyStyle3 = {
    fontFamily: 'Roboto',
    fontSize: is900 ? '16px' : '20px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    background: 'linear-gradient(180deg, #FFF 57.97%, rgba(255, 255, 255, 0.46) 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    width: "100%",
    marginBottom:"-13px"


  };

  const customLink = {
    fontFamily: 'Roboto',
    fontSize: is900 ? '16px' : '20px',
    fontStyle: 'normal',
    fontWeight: 700,
    color: "#0197F1",
    textDecoration: "none",
    marginTop: "-3px",
    marginLeft: "6px",
    width: is900 ? "100%" : "",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
  }

  const buttonStyle = {
    width: "100%",
    maxWidth: "22.875rem",
    height: "3.5625rem",
    background: "#0191E5",
    borderRadius: "1.25rem",
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: "1.25rem",
    fontWeight: "700",
    textTransform: 'none',
    flexShrink: 0,
    marginTop: "50px",
    marginInline: "16px"
  }

  const logoStyle = {
    width: "100%", 
    maxWidth: "231px"
  }

  const boxStyles = {
    width: "100%", 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "center"
  }

  const boxStyles2 = {
    width: "100%", 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "center"
  }

  const boxStyles3 = {
    width: "100%", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-between"
  }

  const formControlStyle = {
    display: "flex", 
    flexDirection: "initial",
    alignItems: "center" 
  }

  const [backgroundCam, setBackgroundCam] = useState("#0197F1")

const camStyle = {
  display:"flex", 
  justifyContent:"center", 
  width:"88px", 
  height:"88px", 
  background: backgroundCam,
  borderRadius:"20px",
  marginTop:"36px"
}

  return (
   
      <BackGround>
        <Box sx={{ display: "flex", flexDirection: "column", height:"100%", width:"100%",maxWidth:is900?"336px":"520px" }}>
          
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <img style={logoStyle} src={logo} alt="Logo E-ndustry" />
          </Box>
          <Typography style={customTypographyStyle}>
            Registrarse
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: is900 ? "" : "flex", marginTop: "30px", marginBottom: "40px", justifyContent:"space-between"}}>
              <Typography style={customTypographyStyle2}>
              Ya tienes una cuenta registrada?
              </Typography>
              <Link style={customLink} to="/login">
                Iniciar Sesión
              </Link>
            </Box>
            <Box sx={boxStyles}>
            <Typography style={customTypographyStyle3}>
                Inserta tu Nombre de usuario.
              </Typography>

              <TextField
                label="Nombre_De_Usuario"
                variant="outlined"
                margin="normal"
                fullWidth
                id="user"
                name="user"
                type="user"
                value={formik.values.user}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.user && Boolean(formik.errors.user)}
                helperText={formik.touched.user && formik.errors.user ? (
                  <Typography sx={{ color: "red", fontSize: "14px", position: "absolute", bottom: "-16px" }}>
                    {formik.errors.user}
                  </Typography>
                ) : ''}
                sx={{ backgroundColor: 'rgba(56, 56, 56, 0.5)', borderRadius: "20px", marginBottom: "16px" }}
                InputProps={{ style: { borderRadius: "20px", position: "relative" } }}
                InputLabelProps={{style:{color:"#878787"}}}
              />


              <Typography style={customTypographyStyle3}>
                Inserta tu Email.
              </Typography>

              <TextField
                label="Correo Electrónico"
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email ? (
                  <Typography sx={{ color: "red", fontSize: "14px", position: "absolute", bottom: "-16px" }}>
                    {formik.errors.email}
                  </Typography>
                ) : ''}
                sx={{ backgroundColor: 'rgba(56, 56, 56, 0.5)', borderRadius: "20px", marginBottom: "16px" }}
                InputProps={{ style: { borderRadius: "20px", position: "relative" } }}
                InputLabelProps={{style:{color:"#878787"}}}
              />

              <Typography style={customTypographyStyle3}>
                Inserta tu Contraseña.
              </Typography>
              <TextField
                label="Contraseña"
                variant="outlined"
                margin="normal"
                fullWidth
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password ? (
                  <Typography sx={{ color: "red", fontSize: "14px", position: "absolute", bottom: "-16px" }}>
                    {formik.errors.password}
                  </Typography>
                ) : ''}
                sx={{ backgroundColor: 'rgba(56, 56, 56, 0.5)', borderRadius: "20px", marginBottom: "16px" }}
                InputProps={{ style: { borderRadius: "20px" } }}
                InputLabelProps={{style:{color:"#878787"}}}

              />


              <Box sx={boxStyles2}>

                

                  <Box sx={camStyle}>
                <img src={imgCam_1} alt="Cam" style={{width:"56px"}} />
                   </Box>

                <Button type="submit" style={buttonStyle}>
                  Registrarme
                </Button>
              </Box>

            </Box>
          </form>
          </Box>
        
      </BackGround>

    
  );
};