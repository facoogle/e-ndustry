const { User , Company } = require("../../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.js");
const nodemailer = require("nodemailer");
const {changePasswordNotification} = require("./notifications/notifications")
const { HOST_EMAIL, PORT_EMAIL, EMAIL, EMAIL_PASS, DB_HOST, DB_PORT, CLIENT_PORT, REACT_APP_HOST } =
  process.env;

  // const userSingIn = async (req, res, next) => {
  //   // Verificar si req.body es null o undefined
  //   if (req.body === null || req.body === undefined) {
  //     res.status(400).send({ message: "Invalid request body" });
  //     return;
  //   }
  
  //   // Obtener los datos del cuerpo de la solicitud
  //   const { username, email, password } = req.body;
  
  //   // Verificar si los campos requeridos están presentes
  //   if (!username || !email || !password) {
  //     res.status(400).send({ message: "Missing required fields" });
  //     return;
  //   }
  
  //   let passwordCryp = bcrypt.hashSync(
  //     password,
  //     Number.parseInt(authConfig.rounds)
  //   );
  
  //   try {
  //     const usernameCreate = await User.findOne({
  //       where: { username: username },
  //     });
  //     const emailCreate = await User.findOne({ where: { email: email } });
  
  //     if (usernameCreate) {
  //       res.status(400).send({ message: "El nombre de usuario ya esta en uso" });
  //     } else if (emailCreate) {
  //       res.status(400).send({ message: "Email en uso, por favor elige otro" });
  //     } else if (!usernameCreate && !emailCreate) {
  //       User.create({
  //         username: username,
  //         email: email,
  //         password: passwordCryp,
  //       }) 
        
  //         .then((user) => sendConfirmationEmail(user))
  //       res.send({ message: "Usuario creado correctamente, ya puedes iniciar sesion !" });
  //     }
  //   } catch (err) {
  //     res.status(400).send(err);
  //     console.log('Password:', password);
  //     console.log('Rounds:', authConfig.rounds);
  //   }
  // };

  const userSingIn = async (req, res, next) => {
    // Verificar si req.body es null o undefined
    if (req.body === null || req.body === undefined) {
      res.status(400).send({ message: "Invalid request body" });
      return;
    }
  
    // Obtener los datos del cuerpo de la solicitud
    const { username, email, password, companyId, role } = req.body;
  
    // Verificar si los campos requeridos están presentes
    if (!username || !email || !password || !companyId || !role) {
      res.status(400).send({ message: "Missing required fields" });
      return;
    }
  
    let passwordCryp = bcrypt.hashSync(
      password,
      Number.parseInt(authConfig.rounds)
    );
  
    try {
      const usernameCreate = await User.findOne({
        where: { username: username },
      });
      const emailCreate = await User.findOne({ where: { email: email } });
  
      if (usernameCreate) {
        res.status(400).send({ message: "El nombre de usuario ya está en uso" });
      } else if (emailCreate) {
        res.status(400).send({ message: "Email en uso, por favor elige otro" });
      } else if (!usernameCreate && !emailCreate) {
        const newUser = await User.create({
          username: username,
          email: email,
          password: passwordCryp,
          companyId: companyId,
        });

        // Asignar el rol correspondiente
        if (role === 'admin') {
          newUser.admin = true;
          newUser.operador = false;
        } else if (role === 'operador') {
          newUser.operador = true;
          newUser.admin = false;
        } else {
          res.status(400).send({ message: "Rol no válido" });
          return;
        }

        await newUser.save();
        
        // Envía el email de confirmación (si es necesario)
        sendConfirmationEmail(newUser);

        res.send({ message: "Usuario creado correctamente, ya puede iniciar sesión!" });
      }
    } catch (err) {
      res.status(400).send(err);
      console.log('Password:', password);
      console.log('Rounds:', authConfig.rounds);
    }
};




const userSignInAdmin = async (req, res, next) => {
  // Verificar si req.body es null o undefined
  if (req.body === null || req.body === undefined) {
    res.status(400).send({ message: "Invalid request body" });
    return;
  }

  // Obtener el token desde el cuerpo de la solicitud
  const { token, username, email, password, role } = req.body;

  // Verificar si los campos requeridos están presentes
  if (!token || !username || !email || !password || !role) {
    res.status(400).send({ message: "Missing required fields" });
    return;
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, authConfig.secret);
    

    // Obtener la companyId desde el token decodificado
    const { user } = decoded;
    const { companyId } = user;

    if (!companyId) {
      res.status(400).send({ message: "No se proporcionó una companyId válida" });
      return;
    }

    let passwordCryp = bcrypt.hashSync(
      password,
      Number.parseInt(authConfig.rounds)
    );

    const usernameCreate = await User.findOne({
      where: { username: username },
    });
    const emailCreate = await User.findOne({ where: { email: email } });

    if (usernameCreate) {
      res.status(400).send({ message: "El nombre de usuario ya está en uso" });
    } else if (emailCreate) {
      res.status(400).send({ message: "Email en uso, por favor elige otro" });
    } else {
      const newUser = await User.create({
        username: username,
        email: email,
        password: passwordCryp,
        companyId: companyId,
      });

      // Asignar el rol correspondiente
      if (role === 'admin') {
        newUser.admin = true;
        newUser.operador = false;
      } else if (role === 'operador') {
        newUser.operador = true;
        newUser.admin = false;
      } else {
        res.status(400).send({ message: "Rol no válido" });
        return;
      }

      await newUser.save();

      // Envía el email de confirmación (si es necesario)
      // sendConfirmationEmail(newUser);

      res.send({ message: "Usuario creado correctamente, ya puede iniciar sesión..!" });
    }
  } catch (err) {
    res.status(401).send({ message: "Token inválido" });
  }
};

  const companySignUp = async (req, res, next) => {
    // Verificar si req.body es null o undefined
    if (req.body === null || req.body === undefined) {
      res.status(400).send({ message: "Invalid request body" });
      return;
    }
  
    // Obtener los datos del cuerpo de la solicitud
    const { userId, name, email, direccion, contact, description, imagen } = req.body;
  
    // Verificar si los campos requeridos están presentes
    if (!userId || !name || !email) {
      res.status(400).send({ message: "Missing required fields" });
      return;
    }
  
    try {
      // Obtener el usuario por ID
      const user = await User.findByPk(userId);

      // Verificar si el usuario es un superadmin
      if (!user || !user.superAdmin) {
        res.status(403).send({ message: "Acceso no autorizado" });
        return;
      }

      const emailExists = await Company.findOne({ where: { email: email } });
  
      if (emailExists) {
        res.status(400).send({ message: "Email de la compañía en uso, por favor elige otro" });
      } else {
        Company.create({
          name: name,
          email: email,
          direccion: direccion,
          contact: contact,
          description: description,
          imagen: imagen,
        });
  
        res.send({ message: "Compañía creada correctamente" });
      }
    } catch (err) {
      res.status(400).send(err);
    }
};

const companyEdit = async (req, res) => {
  try {
    const { companyId } = req.query;
    const { userId, name, email, direccion, contact, description, imagen } = req.body;

    console.log(userId)
    
    const user = await User.findByPk(userId);
    if (!user || !user.superAdmin) {
      res.status(403).send({ message: "Acceso no autorizado" });
      return;
    }

    // Buscar la compañía por su ID
    const company = await Company.findByPk(companyId);
    if (!company) {
      res.status(404).send({ message: "Compañía no encontrada" });
      return;
    }

    // Actualizar los datos de la compañía
    await company.update({
      name: name || company.name,
      email: email || company.email,
      direccion: direccion || company.direccion,
      contact: contact || company.contact,
      description: description || company.description,
      imagen: imagen || company.imagen,
    });

    res.send({ message: "Datos de la compañía actualizados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error interno del servidor" });
  }
}

// BORRADO LOGICO DE COMPANIA
const companyDelete = async (req, res) => {
 
  try {
    const { companyId } = req.query;
    console.log(companyId)
    // Buscar la compañía por su ID
    const company = await Company.findByPk(companyId, {
      include: [{ model: User, attributes: ['id'], where: { companyId } }],
    });

    if (!company) {
      res.status(404).send({ message: "Compañía no encontrada" });
      return;
    }

    // Borrado lógico de la compañía
    await company.update({  emailVerified: false });

    // Actualizar el campo emailVerified de los usuarios asociados a la empresa
    await User.update(
      { emailVerified: false },
      { where: { companyId: company.id } }
    );

    res.send({ message: "Compañía y usuarios desactivados de la empresa" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error interno del servidor" });
  }
};

const activeCompany = async (req, res) => {
 
  try {
    const { companyId } = req.query;
    console.log(companyId)
    // Buscar la compañía por su ID
    const company = await Company.findByPk(companyId, {
      include: [{ model: User, attributes: ['id'], where: { companyId } }],
    });

    if (!company) {
      res.status(404).send({ message: "Compañía no encontrada" });
      return;
    }

    // Borrado lógico de la compañía
    await company.update({  emailVerified: true });

    // Actualizar el campo emailVerified de los usuarios asociados a la empresa
    await User.update(
      { emailVerified: true },
      { where: { companyId: company.id } }
    );

    res.send({ message: "Compañía y usuarios Activados nuevamente sin problemas" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error interno del servidor" });
  }
};



const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    // Obtén los datos de la empresa por ID
    const company = await Company.findByPk(companyId);

    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    // Obtén la lista de usuarios asociados con la empresa
    const users = await User.findAll({
      where: { companyId },
    });

    // Devuelve los datos de la empresa y los usuarios
    res.status(200).json({ company, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    // Utiliza el modelo de Company para obtener todas las compañías
    const companies = await Company.findAll();

    // Envía las compañías como respuesta
    res.json(companies);
  } catch (error) {
    console.error('Error al obtener todas las compañías:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener las compañías.' });
  }
};

const getAllUserCompany = async (req, res) => {
  try {
    
    const { companyId } = req.query;
    console.log(companyId, "aver")

    if (!companyId) {
      return res.status(400).json({ message: 'Se requiere un ID de compañía válido' });
    }

    const users = await User.findAll({
      where: { companyId: companyId },
    });

    res.status(200).json({ users: users });
  } catch (error) {
    console.error('Error al obtener usuarios por compañía:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const addUserToCompany = async (req, res, next) => {
  const { userId, companyId, role } = req.body;

  try {
      // Verificar si el usuario y la compañía existen
      const user = await User.findByPk(userId);
      const company = await Company.findByPk(companyId);

      if (!user || !company) {
          res.status(404).send({ message: "Usuario o compañía no encontrados" });
          return;
      }

      // Asociar al usuario con la compañía
      user.companyId = companyId;

      // Asignar el rol correspondiente
      if (role === 'admin') {
          user.admin = true;
          user.operador = false;
      } else if (role === 'operador') {
          user.operador = true;
          user.admin = false;
      } else {
          res.status(400).send({ message: "Rol no válido" });
          return;
      }

      await user.save();

      res.send({ message: "Usuario asociado a la compañía correctamente con el rol indicado" });
  } catch (err) {
      res.status(500).send({ message: "Error al asociar usuario a la compañía", error: err.message });
  }
};


  const userLogin = async (email, password, res) => {
    try {
      let user = await User.findOne({
        where: {
          email: email,
        },
      });
      // console.log(user)
      if (!user) {
        throw new Error("Usuario y/o contraseña incorrectos!");
      } 
      if (!user.loginCam){
        throw new Error("Verifica tu rostro antes de iniciar sesión!");
      }
      else {
        if (user.banned || !user.emailVerified) {
          throw new Error("Las cuentas de esta empresa se encuentran inhabilitadas. Si eres el administrador, contacta a soporte@endustry.com");
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            let token = jwt.sign({ user: user }, authConfig.secret, {
              expiresIn: authConfig.expires,
            });
            user.update({ logged: true });
            // console.log('1',user.logged)
            setTimeout(function () {
              user.update({ logged: false });
            }, 15000); // a los 5 minutos se pone el status del logged en false
            // console.log('user y token', user, token)
            return token
          } else {
            throw new Error("Email o contraseña incorrecto!");
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: error.message,
      });
    }
  };

const userLogOut = async (user, token) => {
  try {
    const actualUser = await User.findByPk(user.id);
    if (!actualUser) {
      throw new Error("user not found");
    } else {
      const newToken = jwt.sign({ user: actualUser }, authConfig.secret, {
        expiresIn: 30,
      });
      if (actualUser.logged) {
        setTimeout(function () {
          actualUser.update({ logged: false });
        }, 10000);}
      return {
        user: actualUser.dataValues,
        token: newToken,
      };}
  } catch (error) {
    console.log(error);
  }
};



// send Email confirmation
function sendConfirmationEmail(user) {
  let transporter = nodemailer.createTransport({
    host: `${HOST_EMAIL}`,
    port: `${PORT_EMAIL}`,
    secure: false,
    auth: {
      user: `${EMAIL}`,
      pass: `${EMAIL_PASS}`,
    },
  });
  var token = jwt.sign({ email: user.email }, authConfig.secret);
  //const urlConfirm = `http://${REACT_APP_HOST}/confirm-account/${token}`;

  return transporter
    .sendMail({
      from: "nutri.u.contact@gmail.com",
      to: user.email,
      subject: "Se creo una cuenta con su email en E-ndustry",
      html: `<p>Su cuenta fue creada correctamente, un administrador de E-ndustry habilito una cuenta en con su email. `,
    })
    .then(() => user);
}

 function sendConfirmationEmail2(user) {
  let transporter = nodemailer.createTransport({
    host: `${HOST_EMAIL}`,
    port: `${PORT_EMAIL}`,
    secure: false,
    auth: {
      user: `${EMAIL}`,
      pass: `${EMAIL_PASS}`,
    },
  });
  var token = jwt.sign({ email: user.email }, authConfig.secret);
  //const urlConfirm = `http://${REACT_APP_HOST}/confirm-account/${token}`;

  if(user.emailVerified){
    return transporter
    .sendMail({
      from: "nutri.u.contact@gmail.com",
      to: user.email,
      subject: "Su cuenta fue habilitada por un administrador",
      html: `<p>Ya puedes iniciar sesion en E-ndustry. `,
    })
  } else{
    return transporter
    .sendMail({
      from: "nutri.u.contact@gmail.com",
      to: user.email,
      subject: "Su cuenta fue inhabilitada por un administrador, contactate si crees que es un error",
      html: `<p>Contacta con un administrador. `,
    })
  }

  
    
}



const confirmAccount = async (req, res) => {
  // confirmar cuenta controller
  try {
    confirmAccount2(req.params.token)
      .then(() => {
        res
          .status(200)
          .send({ succes: true, message: "user confirmed succesfully" });
      })
      .catch((err) =>
        res.status(400).send({ succes: false, message: err.message })
      );
  } catch (err) {
    console.log(err);
  }
};

async function confirmAccount2(token) {
  var email = null;
  try {
    const payload = jwt.verify(token, authConfig.secret);
    email = payload.email;
  } catch (err) {
    throw new Error("Ups!, token is invalid");
  }

  User.update(
    { emailVerified: true },
    {
      where: {
        email: email,
      },
    }
  );
}


async function confirmAccount3(id) {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    
    user.emailVerified = true;
    await user.save();
  } catch (error) {
    throw new Error("Error confirming account");
  }
}


const forgotPassword = async (req, res)=>{
  const {email} = req.body
  try {
    if(!email){
      res.send({message:"Insert email"})

    } else if(email){

    const oldUser = await User.findOne({where:{email:email}})
    
    
    if(!oldUser){
      res.status(400).send({message:"Email no exist"})
    }
    else if(oldUser){
      var token = jwt.sign({ email: oldUser.email }, authConfig.secret, {expiresIn:"5m"});
      changePasswordNotification(email,token)
      res.send({message:"An email to recover password was sent successfully, check your email"})
    }
  }
  } catch (error) {
    console.log(error)
  }
}

const newPassword = async (req, res) => {
  let {token} = req.params
  let {password} = req.body
  

  let passwordCryp = bcrypt.hashSync(
    password,
    Number.parseInt(authConfig.rounds)
  );
   
  try {
    const payload = jwt.verify(token, authConfig.secret);
    let email = payload.email;
    User.update(
      { password: passwordCryp },
      {
        where: {
          email: email,
        },
      })

    res.send({message:"Your password was successfully modified"})
  } catch (error) {
    res.status(400).send({message:"Your session expired, or token is invalid"})
  }
}




module.exports = {
  userSingIn,
  userLogin,
  userLogOut,
  confirmAccount,
  forgotPassword,
  newPassword,
  sendConfirmationEmail2,
  companySignUp,
  addUserToCompany,
  getAllCompanies,
  getCompanyById,
  userSignInAdmin,
  getAllUserCompany,
  companyEdit,
  companyDelete,
  activeCompany
};
