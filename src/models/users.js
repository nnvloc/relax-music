import bcrypt from 'bcrypt';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models['Orders'], { foreignKey: 'owner', sourceKey: 'id', });
    }

    isValidPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

    toJSON() {
      delete this.password;
      const {password, ...results} = this.dataValues;
      return results;
    }
  };
  Users.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    dob: DataTypes.DATE,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
