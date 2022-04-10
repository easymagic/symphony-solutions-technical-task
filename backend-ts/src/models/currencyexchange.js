'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CurrencyExchange extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CurrencyExchange.init({
    date_and_time: DataTypes.STRING,
    currency_from: DataTypes.STRING,
    amount1: DataTypes.STRING,
    currency_to: DataTypes.STRING,
    amount2: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CurrencyExchange',
  });
  return CurrencyExchange;
};