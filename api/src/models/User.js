const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('user', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
          },
        username:{
            allowNull: false,
            unique: false,
            type:DataTypes.STRING,
            
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password:{
            allowNull: false,
            type:DataTypes.STRING,
        },
        banned:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        operador:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        admin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        superAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        emailVerified:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        imgPerfil:{
            allowNull: true,
            type:DataTypes.TEXT,
        },
        companyId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        loginCam: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        logged: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        timestamps: false,
    });

    // Función para establecer loginCam en true durante 15 segundos
    async function setLoginCamTrueFor15Seconds(userId) {
        await sequelize.models.user.update({ loginCam: true }, { where: { id: userId } });

        // Esperar 15 segundos
        setTimeout(async () => {
            await sequelize.models.user.update({ loginCam: false }, { where: { id: userId } });
        }, 15000); // 15000 milisegundos = 15 segundos
    }

    return {
        setLoginCamTrueFor15Seconds,
    };
};