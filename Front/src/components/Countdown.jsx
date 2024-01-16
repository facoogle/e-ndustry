import React, { useState, useEffect } from 'react';

export const CountdownTimer = ({setTime, setColorCamara, setMessage}) => {
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);

      // Limpiar el temporizador al desmontar el componente
      return () => clearTimeout(timerId);
    }
    if (seconds === 0 ) {
      setTime(false)
      setColorCamara("orange")
      setMessage("")
    }
  }, [seconds]);

  return (
    <div style={{position:"absolute", marginTop:"14vh"}}>
      <p style={{color:"white"}}>Tienes {seconds} segundos para iniciar sesión</p>
    </div>
  );
};

