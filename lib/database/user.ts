import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "./db";

// Define the User model using sequelize.define
export const User = sequelize.define<UserInstance>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numar: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    indexes: [
      {
        unique: true,
        fields: ["numar", "email"],
      },
    ],
  }
);

// Define the User instance type
interface UserInstance extends Model {
  id: number;
  nume: string;
  prenume: string;
  numar: string;
  description: string;
  email: string;
  password: string;
}

export default User;
