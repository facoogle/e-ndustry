import React, {useEffect} from "react";
import { Box,Grid, Typography, useMediaQuery,TextField,Button } from "@mui/material";

import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector} from "react-redux";

import imageFile from "../../assets/newImage.png"

import { editCompany } from "../../state/actions/user";

import { registerCompany } from "../../state/actions/user";

import { getCompanyById } from "../../state/actions/user";

import { useParams } from "react-router-dom";






export const EditCompany = ({user}) =>{

    const dispatch = useDispatch()

    const { id } = useParams();

    useEffect(() => {
      dispatch(getCompanyById(id));
      
    }, [dispatch]);

    const { companySliceID } = useSelector((state) => state.companySliceID);
    console.log(companySliceID, "companias xD")

    useEffect(() => {
      // Actualizar el valor del título en initialValues cuando blogDetailSlice.titulo se haya cargado
      if (companySliceID?.company?.name) {
        formik.setFieldValue('name', companySliceID?.company?.name);
        formik.setFieldValue('email', companySliceID?.company?.email);
        formik.setFieldValue('direccion', companySliceID?.company?.direccion);
        formik.setFieldValue('contact', companySliceID?.company?.contact);
        formik.setFieldValue('imagen', companySliceID?.company?.imagen);
        formik.setFieldValue('description', companySliceID?.company?.description);

       
       
        
      }
    }, [companySliceID]);
  
  

    const is900 = useMediaQuery('(max-width:900px)');

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
        marginBottom:"-5px"
    
    
      };
   

    const boxStyles = {display:"flex", justifyContent:"center",}
    const boxStyles2 = {display:"flex", flexDirection:"column",backgroundColor: "rgba(0, 0, 0, 0.5)", width:"90%", borderRadius:"60px", padding:"40px",height:"100%", minHeight:"550px"}
    const boxStyles3 = {display:"flex", background:"", }
    const GridNavStyle = {display:"flex", justifyContent:"center"}

    
   
    
    const location = useLocation();
   

    const validationSchema = Yup.object({
        email: Yup.string().email('Ingresa un correo electrónico válido').required('Debes colocar un email'),
        direccion: Yup.string().required('Debes colocar una direccion de facturaciòn'),
        name: Yup.string().required("Coloca un nombre de Empresa"),
        contact:Yup.number().required("Coloca un numero"),
        description:Yup.string().required("Debes colocar una description"),
      });
    
      const formik = useFormik({
        initialValues: {
          userId:user?.id,
          email: companySliceID?.company?.email,
          direccion: companySliceID?.company?.direccion,
          name:companySliceID?.company?.name,
          contact:companySliceID?.company?.contact,
          description:companySliceID?.company?.description,
        },
        validationSchema,
        onSubmit: (values) => {
          dispatch(editCompany(id,values))
          console.log(values);
        },
      });

    return(
        <>
        
        <Box
        data-aos="fade" data-aos-offset="-30" data-aos-duration={500}  data-aos-delay="200"
         sx={boxStyles}>
           
            
            <Box sx={boxStyles2}>
                 <Box>
                <Typography sx={{color:"#FFF", fontSize:"26px", marginBottom:"24px"}}>Ingresa los siguientes datos para agregar una nueva empresa</Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                
                <Grid container spacing={2} > 


            <Grid item xs={12} md={4} sx={GridNavStyle}>
            <Box sx={{display:"flex", flexDirection:"column", width:"100%"}}>
                
                <Typography style={customTypographyStyle3}>
                Inserta tu Nombre de la Empresa.
              </Typography>

              <TextField
                label="Nombre_De_Empresa"
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                name="name"
                type="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name ? (
                  <Typography sx={{ color: "red", fontSize: "14px", position: "absolute", bottom: "-16px" }}>
                    {formik.errors.name}
                  </Typography>
                ) : ''}
                sx={{ backgroundColor: 'rgba(56, 56, 56, 0.5)', borderRadius: "20px", marginBottom: "16px", width:"95%",  }}
                InputProps={{ style: { borderRadius: "20px", position: "relative" } }}
                InputLabelProps={{style:{color:"#878787",},
                shrink: formik.values.name ? true : false,
              }}
              />

<Typography style={customTypographyStyle3}>
Inserta un Email de la empresa
              </Typography>

              <TextField
                label="Email_De_Empresa"
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
                sx={{ backgroundColor: 'rgba(56, 56, 56, 0.5)', borderRadius: "20px", marginBottom: "16px", width:"95%",  }}
                InputProps={{ style: { borderRadius: "20px", position: "relative" } }}
                InputLabelProps={{style:{color:"#878787"},
                shrink: formik.values.name ? true : false,}}
              />

<Typography style={customTypographyStyle3}>
Inserta una direccion de Facturación
              </Typography>

              <TextField
                label="Direccion"
                variant="outlined"
                margin="normal"
                fullWidth
                id="direccion"
                name="direccion"
                type="text"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                helperText={formik.touched.direccion && formik.errors.direccion ? (
                  <Typography sx={{ color: "red", fontSize: "14px", position: "absolute", bottom: "-16px" }}>
                    {formik.errors.direccion}
                  </Typography>
                ) : ''}
                sx={{ backgroundColor: 'rgba(56, 56, 56, 0.5)', borderRadius: "20px", marginBottom: "16px", width:"95%",  }}
                InputProps={{ style: { borderRadius: "20px", position: "relative" } }}
                InputLabelProps={{style:{color:"#878787"},
                shrink: formik.values.name ? true : false,}}
              />

<Typography style={customTypographyStyle3}>
Inserta un numero de contacto directo
              </Typography>

              <TextField
                label="############"
                variant="outlined"
                margin="normal"
                fullWidth
                id="contact"
                name="contact"
                type="contact"
                value={formik.values.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact ? (
                  <Typography sx={{ color: "red", fontSize: "14px", position: "absolute", bottom: "-16px" }}>
                    {formik.errors.contact}
                  </Typography>
                ) : ''}
                sx={{ backgroundColor: 'rgba(56, 56, 56, 0.5)', borderRadius: "20px", marginBottom: "16px", width:"95%",  }}
                InputProps={{ style: { borderRadius: "20px", position: "relative" } }}
                InputLabelProps={{style:{color:"#878787"},
                shrink: formik.values.name ? true : false,}}
              />

              


            </Box>
            

            </Grid>

                    <Grid item xs={12} md={4} sx={GridNavStyle}>
                    <Box sx={{display:"flex", flexDirection:"column", width:"100%", height:"100%"}}>

                    <Typography style={customTypographyStyle3}>
                    Inserta una descripción de la empresa
              </Typography>

              <TextField
                label="Descripcion"
                variant="outlined"
                margin="normal"
                fullWidth
                id="description"
                name="description"
                type="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description ? (
                  <Typography sx={{ color: "red", fontSize: "14px", position: "absolute", bottom: "-16px" }}>
                    {formik.errors.description}
                  </Typography>
                ) : ''}
                sx={{ backgroundColor: 'rgba(56, 56, 56, 0.5)', borderRadius: "20px", marginBottom: "16px", width:"95%", height:"100%",   }}
                InputProps={{ style: { borderRadius: "20px", position: "relative", height:"100%" } }}
                InputLabelProps={{style:{color:"#878787", height:"100%"},
                shrink: formik.values.name ? true : false,}}
              />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4} sx={GridNavStyle}>
                    <Box sx={{display:"flex", flexDirection:"column", width:"100%", height:"100%"}}>
                    <Typography style={customTypographyStyle3}>
                    Inserta el logo de la empresa
                    </Typography>
                    <Grid container spacing={2} sx={{marginTop:"24px"}}> 


                  <Grid item xs={12} md={5} sx={GridNavStyle}>
                  <Box sx={{marginTop:"18px", background:"", position:"relative",}}>
                    <img src={imageFile} alt="imageFile" style={{background:"#383838", padding:"8px", borderRadius:"30px", maxWidth: "100%", height: "auto"}} />
                    <Typography sx={{position:"absolute", marginTop:"-55%", marginLeft:"30%"}}>Subir foto</Typography>      

                  </Box>
                  </Grid>
                  <Grid item xs={12} md={7} sx={GridNavStyle}>
                  <Box sx={{display:"flex", flexDirection:"column", width:"100%", height:"100%"}}>
                    <Typography sx={{fontSize:"17px", marginTop:"8px", marginBottom:"16px"}}>
                    Condiciones de la fotografía
                    </Typography>
                    <Typography>
                    • Debe ser de esta medida
                    </Typography>
                    <Typography>
                    • Letras Blancas
                    </Typography>
                    <Typography>
                    • Formato PNG
                    </Typography>
                    <Typography>
                    • Pueda pesar 5 MB Máximo
                    </Typography>
                    
                  </Box>

                  </Grid>
                  <Box sx={{marginTop:"50px", width:"100%", display:"flex", justifyContent:"center", textAlign:"center"}}>
                     <Typography style={customTypographyStyle3}>
                  Al aceptar crearas una nueva empresa
                    </Typography>
                  </Box>
                 
                  <Box sx={{width:"100%", display:"flex",justifyContent:"center"}}>
                    <Button type="submit" sx={{marginTop:"50px",color:"white", background:"var(--BlueFlow, linear-gradient(180deg, #0197F1 0%, #014EA7 100%))"}}>
                    Editar Empresa
                    </Button>
                  </Box>
                    
                  </Grid>
              
              </Box>
   
                    </Grid>
                </Grid>
                </form>
            </Box>
        </Box>
        </>
    )
}