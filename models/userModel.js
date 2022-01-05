'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class user extends Model {

    static associate(models) {
   
      this.hasMany(models.jira,{
        foreignKey:'userId'
      });
    }
    
  };
  user.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    contraseya: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'users',
  });
  return user;
};
