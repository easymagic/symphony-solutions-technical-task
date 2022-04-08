'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    async emailFormatted(){
      // await this.update({email: this.email + '--modified.123...'});
      return this.email + ' Formatted.';
    }
  }
  Contact.init({
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};