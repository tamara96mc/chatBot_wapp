'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class jira extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.campo,{
        foreignKey:'jiraId'
      });
      this.hasMany(models.cliente,{
        foreignKey:'jiraId'
      });
      this.hasMany(models.proyecto,{
        foreignKey:'jiraId'
      });
    }
  };
  jira.init({
    nombre: DataTypes.STRING,
    url_jira: DataTypes.STRING,
    usuario: DataTypes.STRING,
    contraseya: DataTypes.STRING,
    telefono: DataTypes.STRING,
    tipo_jira: DataTypes.STRING,
    userId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'jira',
  });
  return jira;
};