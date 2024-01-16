import React, {useState, useRef, useEffect} from "react";
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
import swal from "sweetalert";

// components
import CameraComponent from "./Componets/CameraComponent";
import MessageDisplay from "./Componets/MessageDisplay";
import { CountdownTimer } from "../../components/Countdown";


const apiUrl = import.meta.env.VITE_API_URL;

console.log(apiUrl)


//images
import imgCam_1 from "../../assets/cam1.svg"


export const Login = () => {


  const [message, setMessage] = useState('');

    const handleValidation = (imageData) => {
        fetch(`${apiUrl}/reconocimiento_facial?email=${formik.values.email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imagen: imageData })
        })
        .then(response => response.text()) 
        .then(data => {
            setMessage(data);
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage('Error al realizar la validación');
        });
    };
    
    const [colorCamara, setColorCamara] = useState("#0197F1")
    const [time, setTime] = useState(false)


    useEffect(() => {
      // Convierte el mensaje a minúsculas para hacer comparaciones más flexibles
      const lowerCaseMessage = message.toLowerCase();
    
      // Verifica el valor de 'lowerCaseMessage' y establece 'colorCamara' en consecuencia
      if (lowerCaseMessage.includes("identidad verificada")) {
        setColorCamara("#00CC14");
        setTime(true)
      } else if (lowerCaseMessage.includes("identidad correcta") && lowerCaseMessage.includes("imagen")) {
        setColorCamara("orange");
      } else if (lowerCaseMessage.includes("no se encontraron caras")) {
        setColorCamara("red");
      }
    }, [message]);


  const dispatch = useDispatch()

  
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
    //setLoading(true)
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
    let email = formik.values.email;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!email) {
      swal("Ingresa un email para verificar tu rostro");
    } else if (!emailRegex.test(email)) {
      swal("Ingresa un email válido para verificar tu rostro");
    } else {
      setOpenCameraModal(true);
    }
  };

  const handleCloseCameraModal = () => {
    setOpenCameraModal(false);
    setMessage("")
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
  background: colorCamara,
  borderRadius:"20px",
  marginTop:"66px"
}




  return (
   <>
      <BackGround>

<div>
      {/* Resto del contenido del componente Login */}

      {/* Botón para abrir el modal de la cámara */}
      

      {/* Modal de la cámara */}



    </div>



        <Box
        data-aos="fade-top" data-aos-offset="-30" data-aos-duration={400}  data-aos-delay="400"
         sx={{ display: "flex", flexDirection: "column", height:"100%",  }}>
          
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


                   {time?<CountdownTimer setTime={setTime} setColorCamara={setColorCamara} setMessage={setMessage}/>:null}

                   

                <Button type="submit" style={buttonStyle}>
                  Iniciar Sesión
                </Button>
              </Box>

            </Box>
          </form>
          </Box>
          
        
      </BackGround>

<Modal
data-aos="fade-top" data-aos-offset="-30" data-aos-duration={1000}  data-aos-delay="800" 
aria-labelledby="transition-modal-title"
aria-describedby="transition-modal-description"
open={openCameraModal}
onClose={handleCloseCameraModal}
closeAfterTransition
BackdropComponent={Backdrop}
BackdropProps={{
  timeout: 500,
  sx: { backgroundColor: "transparent", border:"none" }, // Ajusta la opacidad aquí
}}
sx={{ justifyContent: "center" , marginTop:"18vh"}}
>
< >


  <CameraComponent onCapture={handleValidation} message={message} setMessage={setMessage}/>
  {message?
  <>
  <MessageDisplay message={message} colorCamara={colorCamara} />
  
  </>
  :null}
  
  
</>
</Modal>

</>

    
  );
};