import React, {useEffect} from "react";
import { Box,Grid, Typography, useMediaQuery,TextField,Button,InputLabel, MenuItem, Select, } from "@mui/material";

import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector} from 'react-redux';


import imageFile from "../../assets/newImage.png"

import { getCompanies } from "../../state/actions/user";
import { register } from "../../state/actions/user";






export const NewUserPanel = () =>{

  const dispatch = useDispatch()
  

  useEffect(() => {
    dispatch(getCompanies());
    
  }, [dispatch]);

  const { companySlice } = useSelector((state) => state.companySlice);



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
        marginBottom:"-13px"
    
    
      };
   

    const boxStyles = {display:"flex", justifyContent:"center",}
    const boxStyles2 = {display:"flex", flexDirection:"column",backgroundColor: "rgba(0, 0, 0, 0.5)", width:"90%", borderRadius:"60px", padding:"40px", minHeight:"550px"}
    const boxStyles3 = {display:"flex", background:"", }
    const GridNavStyle = {display:"flex", justifyContent:"center"}

    
   
    
    const location = useLocation();

    const submitUser = (values) =>{
      dispatch(register(values))
    }
   

    const validationSchema = Yup.object({
        email: Yup.string().email('Ingresa un correo electrónico válido').required('Debes colocar un email'),
        password: Yup.string().matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/, 'Ingresa al menos 8 caracteres, 1 numero y caracter especial').required('Debes colocar tu contraseña'),
        username: Yup.string().required("Coloca un nombre usuario"),
        role:Yup.string().required("Coloca un Rol"),
        description:Yup.string().required("Debes colocar una description"),
        companyId:Yup.string().required("Debes colocar un usuario"),
      });
    
      const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          username:'',
          role:"",
          description:"",
          companyId:""
        },
        validationSchema,
        onSubmit: (values) => {
          console.log(values);
          dispatch(register(values))
        },
      });

    return(
        <>
        <Box 
        data-aos="fade" data-aos-offset="-30" data-aos-duration={500}  data-aos-delay="200"
        sx={boxStyles}>
           
            
            <Box sx={boxStyles2}>
                 <Box>
                <Typography sx={{color:"#FFF", fontSize:"26px", marginBottom:"18px"}}>Ingresa los siguientes datos para agregar un nuevo usuario</Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                
                <Grid container spacing={2} > 


            <Grid item xs={12} md={4} sx={GridNavStyle}>
            <Box sx={{display:"flex", flexDirection:"column", width:"100%"}}>
                
                <Typography style={customTypographyStyle3}>
                Inserta tu Nombre de usuario.
              </Typography>

              <TextField
                label="Nombre_De_Usuario"
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                name="username"
                type="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username ? (
                  <Typography sx={{ color: "red", fontSize: "14px", position: "absolute", bottom: "-16px" }}>
                    {formik.errors.username}
                  </Typography>
                ) : ''}
                sx={{ backgroundColor: 'rgba(56, 56, 56, 0.5)', borderRadius: "20px", marginBottom: "16px", width:"95%",  }}
                InputProps={{ style: { borderRadius: "20px", position: "relative" } }}
                InputLabelProps={{style:{color:"#878787"}}}
              />

              

<Typography style={customTypographyStyle3}>
Inserta un Email.
              </Typography>

              <TextField
                label="Nombre_De_Usuario"
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
                InputLabelProps={{style:{color:"#878787"}}}
              />

<Typography style={customTypographyStyle3}>
Inserta una Contraseña.
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
                sx={{ backgroundColor: 'rgba(56, 56, 56, 0.5)', borderRadius: "20px", marginBottom: "16px", width:"95%",  }}
                InputProps={{ style: { borderRadius: "20px", position: "relative" } }}
                InputLabelProps={{style:{color:"#878787"}}}
              />

<Typography style={customTypographyStyle3}>
  Selecciona un rol.
</Typography>

<Select
  label="Rol"
  variant="outlined"
  margin="normal"
  fullWidth
  id="role"
  name="role"
  value={formik.values.role}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.role && Boolean(formik.errors.role)}
  sx={{ backgroundColor: 'rgba(56, 56, 56, 0.5)', borderRadius: "20px", marginBottom: "16px", width:"95%" }}
  inputProps={{
    style: { borderRadius: "20px", position: "relative" },
  }}
  //input={<TextField />}
  InputLabelProps={{style:{color:"#878787"}}}
>
  <MenuItem value="admin">Admin</MenuItem>
  <MenuItem value="operador">Operador</MenuItem>
</Select>

{formik.touched.role && formik.errors.role ? (
  <Typography sx={{ color: "red", fontSize: "14px", position: "absolute", bottom: "-16px" }}>
    {formik.errors.role}
  </Typography>
) : ''}

              


            </Box>
            

            </Grid>

                    <Grid item xs={12} md={4} sx={GridNavStyle}>
                    <Box sx={{display:"flex", flexDirection:"column", width:"100%", height:"100%"}}>

                    <Typography style={customTypographyStyle3}>
Inserta una Descripción
              </Typography>

              <TextField
                label="445588"
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
                InputLabelProps={{style:{color:"#878787", height:"100%"}}}
              />
            
            <Typography style={customTypographyStyle3}>
            Ingresa la empresa a la que te integrarás
                    </Typography>

                    <Select
  label="Seleccionar Empresa"
  variant="outlined"
  margin="normal"
  fullWidth
  id="companyId"
  name="companyId"
  value={formik.values.companyId}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.companyId && Boolean(formik.errors.companyId)}
  displayEmpty
  sx={{marginTop:"18px", backgroundColor: 'rgba(56, 56, 56, 0.5)', borderRadius: "20px", marginBottom: "16px", width: "95%", height: "20%" }}
  inputProps={{ style: { borderRadius: "20px", position: "relative", height: "100%" } }}
  renderValue={(selected) => (
    <Typography sx={{ color: selected ? "white" : "#878787", position: "absolute", bottom: "50%", transform: "translateY(50%)" }}>
      {selected || "Seleccionar"}
    </Typography>
  )}
  IconComponent={() => null} // Oculta el icono de despliegue
  helperText={formik.touched.companyId && formik.errors.companyId ? (
                  <Typography sx={{ color: "red", fontSize: "14px", position: "absolute", bottom: "-16px" }}>
                    {formik.errors.companyId}
                  </Typography>
                ) : ''}
>

  {companySlice?.map((compania)=>{
    
    return(
    <MenuItem value={compania.id}>{compania.name}</MenuItem>
    )
  })}

 
  {/* Asegúrate de agregar todas las opciones que necesites */}
</Select>

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
                    Agregar Usuario
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