import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import iconHome from "../assets/Home.svg";
import iconDashboard from "../assets/Dashboard.png";
import iconCam from "../assets/Camaras.png";
import iconConfig from "../assets/Config.svg";
import iconSalir from "../assets/Salir.svg";
import iconSearch from "../assets/search.svg"

export const NavBar = ({ userType }) => {
  const location = useLocation();
  const is900 = window.innerWidth <= 900;
  let navItems = [];

  switch (userType) {
    case 'superAdmin':
      navItems = [
        { icon: iconHome, label: 'Inicio', link: '/online' },
        { icon: iconDashboard, label: 'Dashboard', link: '/online/dashboard' },
       
        { icon: iconSalir, label: 'Salir', link: '/online/logout' },
      ];
      break;
    case 'admin':
      navItems = [
        { icon: iconHome, label: 'Inicio', link: '/' },
        { icon: iconDashboard, label: 'Dashboard', link: '/online/dashboard' },
        { icon: iconCam, label: 'Cámaras', link: '/online/warnings' },
        { icon: iconSearch, label: 'warnings', link: '/online/warnings' },
        { icon: iconConfig, label: 'Configuración', link: '/online/settings' },

        { icon: iconSalir, label: 'Salir', link: '/online/logout' },
      ];
      break;
    case 'operador':
      navItems = [
        { icon: iconHome, label: 'Inicio', link: '/' },
        { icon: iconSalir, label: 'Salir', link: '/online/logout' },
      ];
      break;
    default:
      break;
  }

  const handleIconClick = () => {
    console.log('Hola, estoy en la ruta:', location.pathname);
    // Realizar otras acciones según la ruta actual
  };

  return (
    <div>
      <div style={{ background:"#000", opacity:"0.5", display:"flex", alignItems:"center", width:"100%", maxWidth:"465px", paddingInline:"40px", borderRadius:"120px"}}>
        {navItems.map((item, index) => (
          <Link to={item.link} key={index} style={{ margin: is900?"6px":"16px", display: "flex" }}>
            <img
              src={item.icon}
              alt={item.label}
              style={{ maxWidth: "100%", height: "auto" }}
              onClick={handleIconClick}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
