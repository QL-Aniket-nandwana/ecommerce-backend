const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const UserDetail = sequelize.define(
  "user_details",
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
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    dob: DataTypes.DATE,
  },
  {
    timestamps: true,
    underscored: true,
  }
);

module.exports = UserDetail;