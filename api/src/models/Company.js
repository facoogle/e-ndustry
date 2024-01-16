const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Company = sequelize.define('company', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
  },
  name: {
      allowNull: false,
      type: DataTypes.STRING,
  },
  email:{
    allowNull: true,
    type:DataTypes.TEXT,
  },
  direccion:{
    allowNull: true,
    type:DataTypes.TEXT,
  },
  contact:{
    allowNull: true,
    type:DataTypes.TEXT,
  },
  description:{
    allowNull: true,
    type:DataTypes.TEXT,
  },
  imagen:{
    allowNull: true,
    type:DataTypes.TEXT,
  },
  emailVerified:{
    type: DataTypes.BOOLEAN,
    defaultValue: true,
},
  }, {
    timestamps: true,
  });

  

  return Company;
};