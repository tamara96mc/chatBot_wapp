'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('datos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      valor: {
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
      campoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'campos',
          key: 'id'
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
    await queryInterface.dropTable('datos');
  }
};