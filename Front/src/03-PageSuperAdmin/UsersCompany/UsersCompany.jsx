import React, {useState, useEffect} from "react";
import { Box,Grid, Typography, useMediaQuery } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import iconEdit from "../../assets/edit.svg"
import iconDelete from "../../assets/delete.svg"
import empresaExample from "../../assets/exampleEmpresa.svg"

import { useDispatch, useSelector } from "react-redux";

import { getUsersCompany } from "../../state/actions/user";

import { useParams } from "react-router-dom";

import { desactivateCompany } from "../../state/actions/user";
import { activateCompany } from "../../state/actions/user";




export const UsersCompany = () =>{

  const { id } = useParams(); 

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersCompany(id));
    
  }, [dispatch]);

  const { usersCompany } = useSelector((state) => state.usersCompany);
   

    const is900 = useMediaQuery('(max-width:900px)');

   
   

    const boxStyles = {display:"flex", justifyContent:"center",}
    const boxStyles2 = {display:"flex", flexDirection:"column",backgroundColor: "rgba(0, 0, 0, 0.5)", width:"90%", borderRadius:"60px", padding:"40px",height:"100%", minHeight:"550px"}



   
    
      


    const [orden, setOrden] = useState(
      usersCompany?.users?.map((el) => ({
        id: el?.id,
        senderName: el?.username,
        email: el?.email,
        type: 'Admin',
        preferenceId: 'pref001',
        updatedAt: '2023-01-01T12:00:00'
      })) || []
    );
    
      const columns = [
       
        { field: 'senderName', headerName: 'Nombre de usuario', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'id', headerName: '#ID del trabajador', width: 100 },
        { field: 'type', headerName: 'Tipo de user', width: 150, 
        renderCell: (params)=>(
            <div style={{color:params.value === "Admin"?"green":"orange"}}>{params.value}</div>
        )  },
        
        {
          field: 'Editar',
          headerName: 'Editar',
          width: 120,
          renderCell: (params) => (
            <button
              onClick={() => {
                window.location.href = `/success?preferenceId=${params.value}`
                console.log(params, "soy params")
              }}
              style={{ background: "#0197F1", borderRadius: "20px", color: "white", width:"100px", borderColor:"#0191E5" }}
            >
              Editar
              <img src={iconEdit} alt="Edit" style={{ marginLeft:"3px"}} />
            </button>
          ),
        },
        {
          field: 'Eliminar',
          headerName: 'Eliminar',
          width: 120,
          renderCell: (params) => (
            <button
              onClick={() => {
                window.location.href = `/success?preferenceId=${params.value}`
                console.log(params, "soy params")
              }}
              style={{ background: "#F00", borderRadius: "20px", color: "white", width:"100px", borderColor:"#E10000" }}
            >
              Eliminar
              <img src={iconDelete} alt="Edit" style={{ marginLeft:"3px"}} />
            </button>
          ),
        },
      ];

      
      const rowClassName = (params) => {
        return params.data.type === 'Operador' ? 'active-row' : 'inactive-row';
      };

      const getRowStyle = (params) => {
        return {
          backgroundColor: params.data.type === 'Admin' ? '#4CAF50' : '#F44336',
          color: 'white', // Establece el color del texto
        };
      };

      
     

    return(
        <>
        <Grid 
        data-aos="fade" data-aos-offset="-30" data-aos-duration={500}  data-aos-delay="200"
        container spacing={2} > 
              <Grid item xs={12} md={3} >
                <Box sx={{display:"flex", justifyContent:"center",}}>
                  <Box sx={{display:"flex", flexDirection:"column",}}>
                  <img src={usersCompany?.company?.imagen} alt="empresa" style={{width:"140px", height:"140px", maxWidth:"140px", maxHeight:"140px", borderRadius:"50%", border:usersCompany?.company?.emailVerified?"4px solid green":"4px solid red", marginTop:"26px"}} />
                  <Typography sx={{color:"white", fontSize:"26px", marginTop:"16px"}}>
                  {usersCompany?.company?.name}
                  </Typography>
                  <Typography>
                  {usersCompany?.company?.direccion}
                  </Typography>
                  <Typography>
                  {usersCompany?.company?.contact}
                  </Typography>
                  <Typography>
                  {usersCompany?.company?.email}
                  </Typography>
                  <Typography sx={{marginTop:"18px", width:"100%", maxWidth:"250px"}}>
                  {usersCompany?.company?.description}
                  </Typography>
                  <Box sx={{marginTop:"18px", display:"flex", width:"100%"}}>
                    <button
              onClick={() => {
                window.location.href = `/online/editCompany/${usersCompany?.company?.id}`
                console.log(params, "soy params")
              }}
              style={{ background: "#0197F1", borderRadius: "20px", color: "white", width:"100px", borderColor:"#0191E5", marginRight:"8px" }}
            >
              Editar
              <img src={iconEdit} alt="Edit" style={{ marginLeft:"3px"}} />
            </button>



            { usersCompany?.company?.emailVerified ?
            <button
              onClick={() => dispatch(desactivateCompany(id))
              }
              style={{ background: "orange", borderRadius: "20px", color: "white", width:"100px", borderColor:"#0191E5", fontSize:"12px" }}
            >
              Desactivar
              <img src={iconEdit} alt="Edit" style={{ marginLeft:"3px"}} />
            </button>

            :

            <button
              onClick={() => dispatch(activateCompany(id))
              }
              style={{ background: "green", borderRadius: "20px", color: "white", width:"100px", borderColor:"green" }}
            >
              Activar
              <img src={iconEdit} alt="Edit" style={{ marginLeft:"3px"}} />
            </button>
            
          }
            
                  </Box>
                  

                 

                </Box>

                
                
                </Box>
                

              </Grid>
              
              <Grid item xs={12} md={9} >
                <Box sx={boxStyles}>
           
            
            <Box sx={boxStyles2}>
                 <Box>
                <Typography sx={{color:"#FFF", fontSize:"26px"}}>Aquí encontraras a los administradores y operadores de esta empresa</Typography>
            </Box>
            <DataGrid
            sx={{color:"white", border:"none",}}
              rows={
                usersCompany?.users?.map((el) => ({
                  id: el?.id,
                  senderName: el?.username,
                  email: el?.email,
                  type: el.admin?'Admin':'Operador', 
                  preferenceId: 'pref001',
                  updatedAt: '2023-01-01T12:00:00'
                })) || []
              }
              columns={columns}
              pageSize={10}
              disableSelectionOnClick // Deshabilita la selección de filas al hacer clic
              classes={{background:"green"}} // Aplicar estilos al DataGrid
              rowClassName={rowClassName}
              getRowStyle={getRowStyle}
            />
            </Box>
        </Box>
              </Grid>
                      
                      </Grid>
        
        </>
    )
}