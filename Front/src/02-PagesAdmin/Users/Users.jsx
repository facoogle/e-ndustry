import React, {useState, useEffect} from "react";
import { Box,Grid, Typography, useMediaQuery } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import iconEdit from "../../assets/edit.svg"
import iconDelete from "../../assets/delete.svg"

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../state/actions/user";





export const Users = ({user}) =>{
    const is900 = useMediaQuery('(max-width:900px)');

    const dispatch = useDispatch()



    useEffect(() => {
      dispatch(getUser(user?.companyId));
      
    }, [dispatch]);
   
    const { allUsers } = useSelector((state) => state.allUsers);

    console.log(allUsers.users, "AHRExd")

    const boxStyles = {display:"flex", justifyContent:"center",}
    const boxStyles2 = {display:"flex", flexDirection:"column",backgroundColor: "rgba(0, 0, 0, 0.5)", width:"90%", borderRadius:"60px", padding:"40px",height:"100%", minHeight:"550px"}



   
    
      


      const [orden, setOrden] = useState([
        { id: 1, senderName: 'Facundo Moreyra', email: 'email@empresa.com', estado: 'Activo',  preferenceId: 'pref001', updatedAt: '2023-01-01T12:00:00' },
        { id: 2, senderName: 'Facundo Moreyra2', email: 'email2@empresa.com', estado: 'Inactivo',  preferenceId: 'pref002', updatedAt: '2023-01-02T12:00:00' },
        { id: 3, senderName: 'Facundo Moreyra', email: 'email@empresa.com', estado: 'Activo',  preferenceId: 'pref001', updatedAt: '2023-01-01T12:00:00' },
        { id: 4, senderName: 'Facundo Moreyra2', email: 'email2@empresa.com', estado: 'Inactivo',  preferenceId: 'pref002', updatedAt: '2023-01-02T12:00:00' },
        { id: 5, senderName: 'Facundo Moreyra', email: 'email@empresa.com', estado: 'Activo',  preferenceId: 'pref001', updatedAt: '2023-01-01T12:00:00' },
        { id: 6, senderName: 'Facundo Moreyra2', email: 'email2@empresa.com', estado: 'Inactivo',  preferenceId: 'pref002', updatedAt: '2023-01-02T12:00:00' },
        { id: 7, senderName: 'Facundo Moreyra', email: 'email@empresa.com', estado: 'Activo',  preferenceId: 'pref001', updatedAt: '2023-01-01T12:00:00' },
        
        
        // Agrega más datos según sea necesario
      ]);
    
      const columns = [
       
        { field: 'senderName', headerName: 'Nombre de usuario', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'id', headerName: '#ID del trabajador', width: 200 },
        { field: 'estado', headerName: 'Estado', width: 250, 
        renderCell: (params)=>(
            <div style={{color:params.value === "Activo"?"green":"red"}}>{params.value}</div>
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
        return params.data.estado === 'Activo' ? 'active-row' : 'inactive-row';
      };

      const getRowStyle = (params) => {
        return {
          backgroundColor: params.data.estado === 'Activo' ? '#4CAF50' : '#F44336',
          color: 'white', // Establece el color del texto
        };
      };
     

    return(
        <>
        <Box sx={boxStyles}>
           
            
            <Box sx={boxStyles2}>
                 <Box>
                <Typography sx={{color:"#FFF", fontSize:"26px"}}>Usuarios registrados en la empresa</Typography>
            </Box>
            <DataGrid
            sx={{color:"white", border:"none",}}
              rows={allUsers?.users?.map((el) => ({
                id: el?.id,
                senderName: el?.username,
                email: el?.email,
                type: el.admin?'Admin':'Operador', 
                estado:el.emailVerified?"Activo":"Inactivo",
                preferenceId: 'pref001',
                updatedAt: '2023-01-01T12:00:00'
              })) || []}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick // Deshabilita la selección de filas al hacer clic
              classes={{background:"green"}} // Aplicar estilos al DataGrid
              rowClassName={rowClassName}
              getRowStyle={getRowStyle}
            />
            </Box>
        </Box>
        </>
    )
}