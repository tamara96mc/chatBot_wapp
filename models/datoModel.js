'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class dato extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dato.belongsTo(models.cliente, {
        foreignKey: 'telefono'
      });
      dato.belongsTo(models.campo, {
        foreignKey: 'campoId'
      });
    }
  };
  dato.init({
    valor: DataTypes.STRING,
    telefono: DataTypes.STRING,
    campoId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'dato',
  });
  return dato;
};