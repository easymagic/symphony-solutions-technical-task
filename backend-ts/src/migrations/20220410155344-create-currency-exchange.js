'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CurrencyExchanges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date_and_time: {
        type: Sequelize.STRING
      },
      currency_from: {
        type: Sequelize.STRING
      },
      amount1: {
        type: Sequelize.STRING
      },
      currency_to: {
        type: Sequelize.STRING
      },
      amount2: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CurrencyExchanges');
  }
};