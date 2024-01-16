import React, {useState, useRef} from "react";
import { Box, Typography, Button, useMediaQuery, TextField, FormControl, Checkbox, Modal,
  Backdrop,
  Fade, } from "@mui/material";
import { BackGround } from "../../components/BackGround";
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { logIn } from "../../state/actions/user"
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';

import Webcam from 'react-webcam';



//images
import imgCam_1 from "../../assets/cam1.svg"


export const Login = () => {

  const webcamRef = useRef(null);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  
  const validationSchema = Yup.object({
    email: Yup.string().email('Ingresa un correo electrónico válido').required('Debes colocar tu email'),
    password: Yup.string().matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/, 'Ingresa al menos 8 caracteres, 1 numero y caracter especial').required('Debes colocar tu contraseña'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleFormSubmit(values)
    },
  });


  const handleFormSubmit = (values) => {
    setLoading(true)
    const data = new FormData();
    for(let value in values){
      data.append(value, values[value])
    }
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
    
    let email = data.get('email')
    let password = data.get('password')

    
     dispatch(logIn({email,password}))
    
    setTimeout(() => {
      setLoading(false)
    }, 2000);
    
      
  };

  const [openCameraModal, setOpenCameraModal] = useState(false);

  const handleOpenCameraModal = () => {
    setOpenCameraModal(true);
  };

  const handleCloseCameraModal = () => {
    setOpenCameraModal(false);
  };


  const captureFaceImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    // Enviar la imagen al backend
    // try {
    //   const response = await fetch('URL_DEL_BACKEND', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ image: imageSrc }),
    //   });

    //   // Manejar la respuesta del backend según tus necesidades
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error('Error al enviar la imagen al backend:', error);
    // }
    console.log(imageSrc)
  };



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
    width: "100%"


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

<div>
      {/* Resto del contenido del componente Login */}

      {/* Botón para abrir el modal de la cámara */}
      

      {/* Modal de la cámara */}
     
<Modal
  aria-labelledby="transition-modal-title"
  aria-describedby="transition-modal-description"
  open={openCameraModal}
  onClose={handleCloseCameraModal}
  closeAfterTransition
  BackdropComponent={Backdrop}
  BackdropProps={{
    timeout: 500,
  }}
  sx={{ justifyContent:"center"}}
>
  <Fade in={openCameraModal}>
    
  <div>
      <Webcam
        audio={false}
        mirrored={true}
        ref={webcamRef}
      />
      <button style={{position:"absolute"}} onClick={captureFaceImage}>Capturar Imagen Facial</button>
    </div>
    
  </Fade>
</Modal>
    </div>



        <Box sx={{ display: "flex", flexDirection: "column", height:"100%",  }}>
          
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <img style={logoStyle} src={logo} alt="Logo E-ndustry" />
          </Box>
          <Typography style={customTypographyStyle}>
            Ingresar
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: is900 ? "" : "flex", marginTop: "30px", marginBottom: "40px" }}>
              <Typography style={customTypographyStyle2}>
                Aún no estas registrado en la plataforma?
              </Typography>
              <Link style={customLink} to="/register">
                Registrate Aquí
              </Link>
            </Box>
            <Box sx={boxStyles}>
              <Typography style={customTypographyStyle3}>
                Inserta tu Nombre de usuario o Email.
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
                InputLabelProps={{style:{color:"#878787"},
                shrink: formik.values.name ? true : true}}
                autocomplete="off"
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
                InputLabelProps={{style:{color:"#878787"},
                shrink: formik.values.name ? true : true}}
                autocomplete="off"
              />


              <Box sx={boxStyles2}>

                <Box style={boxStyles3}>
                  <FormControl sx={formControlStyle}>
                    <Checkbox
                      checked={formik.values.rememberMe || false}
                      onChange={(e) => formik.setFieldValue("rememberMe", e.target.checked)}
                      name="rememberMe"
                      sx={{ color: "#0197F1", width: "20px", height: "20px" }}
                    />
                    <Typography style={customLink}>
                      Recuérdame
                    </Typography>
                  </FormControl>

                  <Link href="#" style={customLink}>
                    ¿Has olvidado tu Contraseña?
                  </Link>
                </Box>

                  <Box onClick={handleOpenCameraModal} sx={camStyle}>
                <img src={imgCam_1} alt="Cam" style={{width:"56px"}} />
                   </Box>

                <Button type="submit" style={buttonStyle}>
                  Iniciar Sesión
                </Button>
              </Box>

            </Box>
          </form>
          </Box>
        
      </BackGround>

    
  );
};