import axios from 'axios'
import swal from 'sweetalert';
import { getUsers } from '../slices/userCompanySlice';
import { getAllUsers } from '../slices/allUsers';


import { getCompanyID } from '../slices/CompanySliceID';

import { getCompany } from '../slices/CompanySlice';

const apiUrl = import.meta.env.VITE_API_URL;

const url = "localhost:5001"


export const logIn = (email, password) => async (dispatch) =>{
    try {
        let res = await axios.post(`${apiUrl}/user/login`, email, password)
        //dispatch(getUser(res.data))
        localStorage.setItem('userData', JSON.stringify(res.data));
        window.location.href = '/';
    }   
catch (e) {
        let respuesta = JSON.parse(e.request.response).error;
        if(respuesta){
           swal(respuesta) 
        }
        else(swal("Ocurrio un error"))
    }

}


export const register = (payload) => async (dispatch) => {
    try {
      console.log(payload, "email")
      const userData = JSON.parse(localStorage.getItem('userData'));
      
      const token = userData?.user;
  
      if (!token) {
        throw new Error('No se encontró un token de autenticación.');
      }
  
     
  
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
  
      const response = await axios.post(`${apiUrl}/user/singin`, payload, {
        headers: headers,
      });
  
      if (response.data.message) {
        swal("", response.data.message, "success").then(() => {
          window.location.href = "/";
        });
      } else {
        console.error("Error en la respuesta de registro:", response.data);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
  
      let errorMessage = "Ocurrió un error al procesar la solicitud.";
  
      if (error.request) {
        try {
          const parsedError = JSON.parse(error.request.response);
          console.log(parsedError)
          if (parsedError.message) {
            errorMessage = parsedError.message;
          }
        } catch (parseError) {
          console.error("Error al analizar la respuesta de error:", parseError);
        }
      }
  
      swal(errorMessage);
    }
  };

  export const registerAdmins = (payload) => async (dispatch) => {
    try {
      console.log(payload, "email")
      const userData = JSON.parse(localStorage.getItem('userData'));
      
      const token = userData?.user;
  
      if (!token) {
        throw new Error('No se encontró un token de autenticación.');
      }
  
     
  
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
  
      const response = await axios.post(`${apiUrl}/user/singinAdmin`, payload, {
        headers: headers,
      });
  
      if (response.data.message) {
        swal("", response.data.message, "success").then(() => {
          window.location.href = "/";
        });
      } else {
        console.error("Error en la respuesta de registro:", response.data);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
  
      let errorMessage = "Ocurrió un error al procesar la solicitud.";
  
      if (error.request) {
        try {
          const parsedError = JSON.parse(error.request.response);
          console.log(parsedError)
          if (parsedError.message) {
            errorMessage = parsedError.message;
          }
        } catch (parseError) {
          console.error("Error al analizar la respuesta de error:", parseError);
        }
      }
  
      swal(errorMessage);
    }
  };

  export const registerCompany = (payload) => async (dispatch) => {
    try {
      console.log(payload, "email")
      const userData = JSON.parse(localStorage.getItem('userData'));
      
      const token = userData?.user;
  
      if (!token) {
        throw new Error('No se encontró un token de autenticación.');
      }
  
     
  
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
  
      const response = await axios.post(`${apiUrl}/user/singinCompany`, payload, {
        headers: headers,
      });
  
      if (response.data.message) {
        swal("", response.data.message, "success").then(() => {
          window.location.href = "/";
        });
      } else {
        console.error("Error en la respuesta de registro:", response.data);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
  
      let errorMessage = "Ocurrió un error al procesar la solicitud.";
  
      if (error.request) {
        try {
          const parsedError = JSON.parse(error.request.response);
          console.log(parsedError)
          if (parsedError.message) {
            errorMessage = parsedError.message;
          }
        } catch (parseError) {
          console.error("Error al analizar la respuesta de error:", parseError);
        }
      }
  
      swal(errorMessage);
    }
  };

  export const editCompany = (companyId, payload) => async (dispatch) => {

    console.log("soy company", companyId)
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      
      const token = userData?.user;
  
      if (!token) {
        throw new Error('No se encontró un token de autenticación.');
      }
  
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
  
      const response = await axios.put(`${apiUrl}/user/editCompany?companyId=${companyId}`, payload, {
        headers: headers,
      });
  
      if (response.data.message) {
        swal("", response.data.message, "success").then(() => {
          // Puedes redirigir a la página que desees después de editar la compañía
          // window.location.href = "/";
        });
      } else {
        console.error("Error en la respuesta de edición de compañía:", response.data);
      }
    } catch (error) {
      console.error("Error al editar la compañía:", error);
  
      let errorMessage = "Ocurrió un error al procesar la solicitud.";
  
      if (error.request) {
        try {
          const parsedError = JSON.parse(error.request.response);
          console.log(parsedError);
          if (parsedError.message) {
            errorMessage = parsedError.message;
          }
        } catch (parseError) {
          console.error("Error al analizar la respuesta de error:", parseError);
        }
      }
  
      swal(errorMessage);
    }
  };


  export const desactivateCompany = (companyId) => async (dispatch) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
  
      const token = userData?.user;
  
      if (!token) {
        throw new Error('No se encontró un token de autenticación.');
      }
  
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
  
      const response = await axios.put(`${apiUrl}/user/bloqCompany?companyId=${companyId}`, {}, {
        headers: headers,
      });
  
      if (response.data.message) {
        swal("", response.data.message, "success").then(() => {
          window.location.href = `/online/userscompany/${companyId}`
        });
      } else {
        console.error("Error en la respuesta al desactivar la compañía:", response.data);
      }
    } catch (error) {
      console.error("Error al desactivar la compañía:", error);
  
      let errorMessage = "Ocurrió un error al procesar la solicitud.";
  
      if (error.request) {
        try {
          const parsedError = JSON.parse(error.request.response);
          console.log(parsedError);
          if (parsedError.message) {
            errorMessage = parsedError.message;
          }
        } catch (parseError) {
          console.error("Error al analizar la respuesta de error:", parseError);
        }
      }
  
      swal(errorMessage);
    }
  };

  export const activateCompany = (companyId) => async (dispatch) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
  
      const token = userData?.user;
  
      if (!token) {
        throw new Error('No se encontró un token de autenticación.');
      }
  
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
  
      const response = await axios.put(`${apiUrl}/user/activeCompany?companyId=${companyId}`, {}, {
        headers: headers,
      });
  
      if (response.data.message) {
        swal("", response.data.message, "success").then(() => {
          window.location.href = `/online/userscompany/${companyId}`
        });
      } else {
        console.error("Error en la respuesta al desactivar la compañía:", response.data);
      }
    } catch (error) {
      console.error("Error al desactivar la compañía:", error);
  
      let errorMessage = "Ocurrió un error al procesar la solicitud.";
  
      if (error.request) {
        try {
          const parsedError = JSON.parse(error.request.response);
          console.log(parsedError);
          if (parsedError.message) {
            errorMessage = parsedError.message;
          }
        } catch (parseError) {
          console.error("Error al analizar la respuesta de error:", parseError);
        }
      }
  
      swal(errorMessage);
    }
  };

  export const getCompanies = () => async (dispatch) => {
    try {
      let userData = JSON.parse(localStorage.getItem('userData'));

      let token = userData.user;
      
      let res = await axios.get(`${apiUrl}/user/AllCompanies`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log(res, "JE")

      dispatch(getCompany(res.data)); 
    } catch (error) {
      console.log(error);
    }
  };

  export const getCompanyById = (companyId) => async (dispatch) => {
    try {
      let userData = JSON.parse(localStorage.getItem('userData'));
      let token = userData.user;
      
      let res = await axios.get(`${apiUrl}/user/company/${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      dispatch(getCompanyID(res.data)); 
    } catch (error) {
      console.log(error);
    }
  };


  export const getUser = (companyId) => async (dispatch) => {
    try {
      let userData = JSON.parse(localStorage.getItem('userData'));
      let token = userData.user;
      
      let res = await axios.get(`${apiUrl}/user/AllUsers?companyId=${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      console.log(res, "JE");
  
      dispatch(getAllUsers(res.data)); 
    } catch (error) {
      console.log(error);
    }
  };



// export const register = (email, password, username) => async (dispatch) =>{
//     try {
//         let res = await axios.post(`${apiUrl}/user/singin`, email, password, username)

//         if(res.data.message){
//             swal("",res.data.message, "success")
//             .then(() => {
//                 window.location.href = "/";
//             });
//         } else {
//             console.log("error")
//         }    
//     } catch (e) {
//         let respuesta = JSON.parse(e.request.response).message;
//         if(respuesta){
//            swal(respuesta) 
           
//         }
//         else(swal("Ocurrio un error"))
        
//     }

// }


export const getUsersCompany = ( id ) => async (dispatch) =>{
    
    
    try {
        let userData = JSON.parse(localStorage.getItem('userData'))
        let token = userData.user.token
        let res = await axios.get(`${apiUrl}/user/company/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        dispatch(getUsers(res.data))
    } catch (error) {
        console.log(error)
    }
}



