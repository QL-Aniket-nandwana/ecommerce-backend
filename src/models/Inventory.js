const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Inventory = sequelize.define(
  'inventory',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    product_variant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

module.exports = Inventory;