const jwt = require("jsonwebtoken");
const authConfig = require("../controllers/config/auth");
const { User } = require("../db");

const isUserAdmin = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No authorization" });
  } else {
    let token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, authConfig.secret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "No authorization" });
      } else {
        try {
          
          // Asumiendo que el modelo User tiene un campo Admin
          const user = await User.findByPk(decoded.user.id);

          if (!user || !user.admin) {
            return res.status(403).json({ message: "Access forbidden. User is not a admin." });
          }

          req.user = user; // Agregar los datos del usuario al objeto req para que estén disponibles en las rutas posteriores
          next();
        } catch (error) {console.log(error)
          return res.status(500).json({ error: "Internal Server Error" });
          
        }
      }
    });
  }
};

module.exports = isUserAdmin;