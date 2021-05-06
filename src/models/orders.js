'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models['OrderDetails'], { foreignKey: 'order', sourceKey: 'id', as: 'items', });
      this.belongsTo(models['Users'], {foreignKey: 'owner'})
    }
  };
  Orders.init({
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'created',
    },
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};
