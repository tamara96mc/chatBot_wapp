'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class campo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      campo.belongsTo(models.jira, {
        foreignKey: 'jiraId'
      });
    }
  };
  campo.init({
    custom_field: DataTypes.STRING,
    nombre: DataTypes.STRING,
    jiraId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'campo',
  });
  return campo;
};