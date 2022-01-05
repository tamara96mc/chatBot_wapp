'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ticket.belongsTo(models.cliente, {
        foreignKey: 'telefono'
      });
    }
  };
  ticket.init({
    proyecto: DataTypes.STRING,
    tipo: DataTypes.STRING,
    resumen: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    tarea: DataTypes.STRING,
    nombre: DataTypes.STRING,
    telefono: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ticket',
  });
  return ticket;
};