const { User, conn } = require('./src/db.js');
const { PORT } = process.env;
const { spawn } = require('child_process');
const app = require('./src/app.js');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const createAdmin = async () => {
  const adminUser = await User.findOne({ where: { admin: true } });
  if (!adminUser) {
    await User.create({
      username: 'Administrador',
      email: 'admin@genlife.com',
      password: "$2b$10$s6lMYCUn2D0KbVIHfo6i7ugERiAjAq497jpwP4utBhKuKN4ae/oY.",
      admin: true,
    });
    console.log('Usuario admin creado con éxito.');
  } else {
    console.log('Ya existe un usuario admin.');
  }
};

conn.sync({ alter: true }).then(() => {
  createAdmin();

  const streamingUsers = {};
  let pythonProcess;

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);
  
    socket.on('solicitarInicioTransmision', ({ userId }) => {
      console.log(`Usuario ${userId} solicitó iniciar la transmisión de video.`);
      handleStartVideoStreaming(socket, userId);
    });
  
    socket.on('videoFrame', (data) => handleVideoFrame(socket, data));
    socket.on('disconnect', () => handleDisconnect(socket));
  });
  
  // ...
  
  function handleStartVideoStreaming(socket) {
    console.log(`Usuario ${socket.id} comenzó a transmitir video.`);
  
    const spawnCommand = 'python';
    const spawnArgs = ['./python/more1.py'];
  
    if (!pythonProcess) {
      pythonProcess = spawn(spawnCommand, spawnArgs);
  
      pythonProcess.stdout.on('data', (data) => {
        console.log(`Salida de Python: ${data}`);
      });
  
      pythonProcess.stderr.on('data', (data) => {
        console.error(`Error en el script de Python: ${data}`);
      });
  
      pythonProcess.on('close', (code) => {
        console.log(`Proceso de Python cerrado con código: ${code}`);
        pythonProcess = null;
      });
    }
  
    // Espera el evento 'startVideoStreaming' del cliente
    socket.on('startVideoStreaming', ({ userId }) => {
      // Maneja el inicio de la transmisión de video
      console.log(`Cliente ${userId} solicitó iniciar la transmisión de video.`);
      
      // Puedes realizar acciones adicionales según tus necesidades
    });
  }
  

  function handleVideoFrame({ frame, userId }) {
    if (userId === undefined || userId === null) {
      console.error('El userId no está presente en los datos del videoFrame.');
      return;
    }

    pythonProcess.stdin.write(JSON.stringify({ frame, userId }), 'utf-8');
  }

  function handleDisconnect(socket) {
    console.log('Cliente desconectado:', socket.id);

    if (Object.keys(streamingUsers).length === 0 && pythonProcess) {
      pythonProcess.stdin.end();
      pythonProcess = null;
    }

    delete streamingUsers[socket.id];
  }

  httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
});


