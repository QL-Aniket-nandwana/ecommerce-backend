const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Role = sequelize.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.ENUM("admin", "vendor", "customer"),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
);

module.exports = Role;