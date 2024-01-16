import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import axios from 'axios';
import theme from '../src/theme/theme';


//Components
import { Welcome } from './01-Pages/01-Welcome/Welcome';
import { Login } from './01-Pages/02-Login/Login';
import { Register } from './01-Pages/03-Register/Register';
import { HeadNavBar } from './components/HeadNavBar';
import { Emma } from './components/Emma';
import { Asistente } from './components/Asistente';

// admin

import { Home } from './02-PagesAdmin/Home/Home';
import { NewUser } from './02-PagesAdmin/NewUser/NewUser';
import { Users } from './02-PagesAdmin/Users/Users';
import { Dates } from './02-PagesAdmin/Dates/Dates';
import { VideoStream } from './components/VideoTest';

//super admin
import { NewCompany } from './03-PageSuperAdmin/NewUser/NewCompany';
import { EditCompany } from './03-PageSuperAdmin/NewUser/EditCompany';
import { NewUserPanel } from './03-PageSuperAdmin/NewUser/NewUserPanel';
import { Companies } from './03-PageSuperAdmin/ListCompanies/Companies';
import { UsersCompany } from './03-PageSuperAdmin/UsersCompany/UsersCompany'


//admin and super

import { Logout } from './03-PageSuperAdmin/Logout/Logout';

import { decodeJWT } from './Utils/decodeJWT';

// Operador Activar Camara
import { activateDetection } from './state/actions/Operador';


import './App.css';
import "aos/dist/aos.css";
import AOS from "aos";


const apiUrl = import.meta.env.VITE_API_URL;

function App() {


  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init();
  }, []);

  const [user, setUser] = useState([])
  const [tokenUser, setTokenUser] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const token = userData ? JSON.parse(userData).user : null;

    const decoded = token ? decodeJWT(token): null;
    const decodedUser = decoded?.user;

    setTokenUser(tokenUser)

    const validateToken = async () => {
      try {
        // Hacer una llamada al servidor para verificar la validez del token
        const response = await axios.get(`${apiUrl}/user/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.user) {
          console.log(response.data);
          // El token es válido, continuar con la sesión
          setDecodedToken(decodedUser);
          
        } else {
          // El token ha expirado o no es válido, redirigir a la página de inicio de sesión
          localStorage.removeItem('userData'); // Eliminar el token del localStorage
          navigate('/');
        }
      } catch (error) {
        // Error al validar el token, redirigir a la página de inicio de sesión
        localStorage.removeItem('userData'); // Eliminar el token del localStorage
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (decodedUser && decodedUser.username) {
      // El token es válido, continuar con la sesión
      validateToken();
    } else {
      // No hay un token válido, redirigir a la página de inicio de sesión
      localStorage.removeItem('userData'); // Eliminar el token del localStorage
      setIsLoading(false);
     
    }
    setUser(decodedUser)
  console.log(decodedUser, "decoded")
  }, []);


  useEffect(()=>{
    if(decodedToken && decodedToken.operador){
      activateDetection()
      console.log(" Camara Desactivada para operador")
      // Activamos la camara cuando inicia sesion el operador.
    }
  },[decodedToken])


  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
       
        
        
        {isLoading ? (
          <div>Loading...</div> // Muestra un indicador de carga mientras se verifica el token
        ) : (
          <>
          
           
          <Routes>
          
          {decodedToken && decodedToken.superAdmin ? (
          <>
            <Route path='/' element={<HeadNavBar><Companies user={user} /></HeadNavBar>} />
            <Route path='/online' element={<HeadNavBar><Companies user={user}/></HeadNavBar>} />
            <Route path='/online/companies' element={<HeadNavBar><Companies user={user}/></HeadNavBar>} />
            <Route path='/online/newcompany' element={<HeadNavBar><NewCompany user={user}/></HeadNavBar>} />
            <Route path='/online/editCompany/:id' element={<HeadNavBar><EditCompany user={user}/></HeadNavBar>} />
            <Route path='/online/newuserpanel' element={<HeadNavBar><NewUserPanel/></HeadNavBar>} />
            <Route path='/online/userscompany/:id' element={<HeadNavBar><UsersCompany/></HeadNavBar>} />
            <Route path='/online/logout' element={<HeadNavBar><Logout/></HeadNavBar>} />
            <Route path='/online/dashboard' element={<HeadNavBar><Dates/></HeadNavBar>} />

            
          
            <Route path='/online/emma' element={<HeadNavBar><Emma/></HeadNavBar>} />
          </> ) : null}
            
              
            
            {decodedToken && decodedToken.admin?(
              <>
            <Route path='/' element={<HeadNavBar><Home user={user}/></HeadNavBar>} />
            <Route path='/online' element={<HeadNavBar><Home user={user}/></HeadNavBar>} />
            <Route path='/online/warnings' element={<HeadNavBar><Home user={user}/></HeadNavBar>} />
            <Route path='/online/logout' element={<HeadNavBar><Home user={user}/></HeadNavBar>} />
            <Route path='/online/newuser' element={<HeadNavBar><NewUser/></HeadNavBar>} />
            <Route path='/online/users' element={<HeadNavBar><Users user={user}/></HeadNavBar>} />
            <Route path='/online/dashboard' element={<HeadNavBar><Dates/></HeadNavBar>} />
            
            <Route path='/online/settings' element={<HeadNavBar><>Configuracion</></HeadNavBar>} />
            
            
            </>
            )
            :
            null}


        {decodedToken && decodedToken.operador ? (  
          <>
            <Route exact path='/' element={<HeadNavBar><Home user={user}/></HeadNavBar>} />
            <Route path='/online' element={<HeadNavBar><Home user={user}/></HeadNavBar>} />
            <Route path='/online/logout' element={<HeadNavBar><Home user={user}/></HeadNavBar>} />
            <Route path='/online/warnings' element={<HeadNavBar><Home user={user}/></HeadNavBar>} />
          </> ) : null}


          {!decodedToken?.username?(
            <>
            <Route path='/' element={<><Welcome/></>} />
            <Route path='/login' element={<><Login/></>} />
            <Route path='/register' element={<><Register/></>} />
            
            </>
          ):null}
           
            <Route path='/*' element={<Navigate to="/" />} /> 
          </Routes>
          </>
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
