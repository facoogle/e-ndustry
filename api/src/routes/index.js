const { Router } = require("express");
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const userRoute = require('./users/user.js')
const {User} = require("../db.js")
const userModel  = require('../models/User.js');


// 15 segundos para iniciar sesion 

const setLoginCamTrueFor15Seconds = async (user) => {
    await user.update({ loginCam: true });

    // Esperar 15 segundos
    setTimeout(async () => {
        await user.update({ loginCam: false });
    }, 15000); // 15000 milisegundos = 15 segundos
};

// Importar todos los routers;

const router = Router();

// Configurar los routers


router.use('/user', userRoute)

router.post('/reconocimiento_facial', async  (req, res) => {
  console.log('Recibida solicitud POST /reconocimiento_facial');
  console.log('Llamando al script de Python...');

  let email = req.query.email

  const user = await await User.findOne({ where: { email: email }})

  if (!email) {
    return res.status(404).send("Ingresa un email por favor");
  }

  if (!user) {
    return res.status(404).send("Este email no se encuentra registrado");
  }

  if(!user.imgPerfil){
    return res.status(404).send("Usuario registrado sin imagen, contacta un administrador")
  }

  


  const URLIMAGEN = user.imgPerfil

  const imagenB64 = req.body.imagen.split(',')[1];
  const imagenBuffer = Buffer.from(imagenB64, 'base64');
  
  fs.writeFileSync('debugImage.png', imagenBuffer);

  const tempFilePath = path.join(__dirname, 'tempImage.png');
  fs.writeFileSync(tempFilePath, imagenBuffer);

  const pythonProcess = spawn('python', ['Login.py', tempFilePath,URLIMAGEN]);

  let errorMessage = '';

  pythonProcess.stdout.on('data', (data) => {
      console.log('Python script output:', data.toString());
      const lowerCaseMessage = data.toString().toLowerCase(); // 
      if (lowerCaseMessage.includes("identidad verificada")) {
        (async () => {
            await setLoginCamTrueFor15Seconds(user);  // si el mensaje de respuesta de python
        })();                                         // contiene identidad verificada
    }                                                 // loginCam pasa a true por 15 segundos 
                                                      // iniciar sesion
      res.send(data.toString());
  });

  pythonProcess.stderr.on('data', (data) => {
      console.error(`Error en el script de Python: ${data}`);
      errorMessage += data.toString();
  });

  pythonProcess.on('close', (code) => {
      console.log(`Python script terminado con código ${code}`);
      fs.unlinkSync(tempFilePath); // Eliminar el archivo temporal
      if (errorMessage) {
          res.status(500).send("Error en el script de Python: " + errorMessage);
      }
  });
});




router.get('/run-camara', (req, res) => {
  const pythonProcess = spawn('python', ['./seguridad/seguridad_web.py', 0]); //0 es el argunmento

  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.send('Python script executed');
  });
});




module.exports = router;