const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Order = sequelize.define(
  'orders',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    status: {
        type: DataTypes.ENUM(
          'pending',
          'shipped',
          'delivered',
          'cancelled'
        ),
        defaultValue: 'pending',
      },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

module.exports = Order;