const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Camaras = sequelize.define('camaras', {
    id: {
      allowNull: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
  },
  name: {
      allowNull: false,
      type: DataTypes.STRING,
  },
  url: {
    allowNull: false,
    type: DataTypes.STRING,
},
  
  
  
  
  }, {
    timestamps: true,
  });

  

  return Camaras;
};