'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exchange extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exchange.init({
    crypto: DataTypes.STRING,
    currency: DataTypes.STRING,
    rate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Exchange',
  });
  return Exchange;
};