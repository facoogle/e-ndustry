const { Router } = require("express");
const { User, PostBlog  } = require("../../db");
const path = require('path');
const fs = require('fs');
const axios = require("axios")
const { Op } = require('sequelize');

const isUserLoggedIn = require("../../middlewares/auth")
const isUserSuperAdmin = require("../../middlewares/authSuperAdmin")
const isUserAdmin = require("../../middlewares/authAdmin")

const {
  userLogin,
  userSingIn,
  companySignUp,
  addUserToCompany,
  getAllCompanies,
  getCompanyById,
  userSignInAdmin,
  getAllUserCompany,
  companyEdit,
  companyDelete,
  activeCompany,
} = require("../../controllers/usersControllers/users.controllers");


const router = Router();

// COMPANY

// Registrar una empresa
router.post("/singinCompany",isUserSuperAdmin, companySignUp);

// Editar una empresa
router.put("/editCompany",isUserSuperAdmin, companyEdit);

// "BORRAR" Bloquear empresa o poner en suspenso (NO SE BORRA, SOLO ES BORRADO LOGICO "true, false de emailVerified")
router.put("/bloqCompany",isUserSuperAdmin, companyDelete);

// "Activar" Activar empresa y usuarios nuevamente 
router.put("/activeCompany",isUserSuperAdmin, activeCompany);

// Agregar un usuario a una empresa
router.post("/addUserCompany", addUserToCompany);

// Trae todas las companias
router.get("/AllCompanies", getAllCompanies);

// Trae una compania por ID
router.get('/company/:id', getCompanyById);

// Trae todos los usuarios
router.get("/AllUsers", getAllUserCompany);




//USERS

// Registrar un usuario (COMO SUPER ADMIN)
router.post("/singin",isUserSuperAdmin, userSingIn);

// Registrar un usuario (COMO ADMIN)
router.post("/singinAdmin",isUserAdmin, userSignInAdmin);





// Inicio de sesion de para todos los usuarios

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userLogin(email, password, res);
    res.json({
      user,
    });
  } catch (error) {
    console.log(error)
  }
});


// verifica constantemente que la sesion iniciada sea por un usuario de E-ndustry

router.get("/protected", isUserLoggedIn, (req, res) => {
  try {
    const user = req.user; // Acceder a los datos del usuario obtenidos en el middleware
    // Realizar acciones con los datos del usuario aquí
    res.json({ user, msg: "Acceso autorizado" });
  } catch (error) {
    // Ocurrió un error, enviar respuesta de error
    res.status(500).json({ error: "Error en el servidor" });
  }
});












// PAGINADO VIEJO EN CASO DE REQUERIRLO LO DEJO ACA + OTRAS RUTAS QUE QUZIAS USE.

// router.get('/paginado', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1; // Página actual
//     const perPage = parseInt(req.query.perPage) || 10; // Cantidad de posts por página
//     const searchQuery = req.query.search || ''; // Consulta de búsqueda por título o tag

//     const offset = (page - 1) * perPage;

//     const whereClause = {
//       [Op.or]: [
//         { titulo: { [Op.iLike]: `%${searchQuery}%` } },
//         { tags: { [Op.contains]: [searchQuery] } }
//       ]
//     };

//     const { count, rows: posts } = await PostBlog.findAndCountAll({
//       where: whereClause,
//       offset,
//       limit: perPage,
//       include: [
//         {
//             model: User,
//             as: 'user',
//             attributes: ['imgPerfil', 'username', 'email'],
//         },
//     ],
//     },);

//     if (count === 0) {
//       return res.status(404).json({ message: 'No se encontraron posts.' });
//     }

//     const totalPages = Math.ceil(count / perPage);

//     return res.status(200).json({
//       totalPages,
//       currentPage: page,
//       perPage,
//       posts,
//     });
//   } catch (error) {
//     console.error('Error al obtener blogs:', error);
//     return res.status(500).json({ error: 'Hubo un error al obtener los blogs.' });
//   }
// });






// router.get("/users", isUserLoggedInAdmin, async (req, res) => {
//   try {
//     const users = await User.findAll({ where: { banned: false } });
//     res.json({ users });
//   } catch (error) {
//     res.status(500).json({ error: "Error en el servidor" });
//   }
// });












// router.post("/banear", isUserLoggedIn, async (req, res) => {
//   try {
//     const { id } = req.body;

//     // Buscar el usuario por ID en la base de datos
//     const user = await User.findOne({ where: { id } });

//     if (!user) {
//       return res.status(404).json({ error: "Usuario no encontrado" });
//     }

//     user.banned = true;
//     user.emailVerified = true
//     await user.save();

//     res.json({ message: "Cuenta Baneada" });
//   } catch (error) {
//     res.status(500).json({ error: "Error en el servidor" });
//   }
// });








// router.get("/confirm/:token", confirmAccount);
// router.post("/forgot-password", forgotPassword)
// router.post("/new-password/:token", newPassword)

module.exports = router;
