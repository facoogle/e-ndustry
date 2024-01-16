const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Video = sequelize.define('Video', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    titulo: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    imageFile: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    descriptionImg: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  }, {
    timestamps: true,
  });

  

  return Video;
};