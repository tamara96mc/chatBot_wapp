'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class proyecto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      proyecto.belongsTo(models.jira, {
        foreignKey: 'jiraId'
      });
    }
  };
  proyecto.init({
    nombre: DataTypes.STRING,
    tipo: DataTypes.STRING,
    jiraId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'proyecto',
  });
  return proyecto;
};