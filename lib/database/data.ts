import { DataTypes } from "sequelize";
import { sequelize } from "./db";

export const PhoneNumber = sequelize.define(
  "phonenumbers",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    savedName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "phonenumbers",
    indexes: [
      {
        unique: true,
        fields: ["phone", "userID"],
      },
    ],
  }
);

export default PhoneNumber;
