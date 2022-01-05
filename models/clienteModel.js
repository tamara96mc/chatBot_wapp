'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cliente.belongsTo(models.jira, {
        foreignKey: 'jiraId'
      });
    }
  };
  cliente.init({
    nombre: DataTypes.STRING,
    telefono: DataTypes.STRING,
    jiraId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cliente',
  });
  return cliente;
};