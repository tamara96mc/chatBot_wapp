'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      proyecto: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      resumen: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      tarea: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING,
        references: {
          model: 'clientes',
          key: 'telefono'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tickets');
  }
};