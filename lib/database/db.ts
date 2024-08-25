import { Sequelize } from "sequelize";

const userName = process.env.NEXT_PUBLIC_DB_USERNAME as string;
const password = process.env.NEXT_PUBLIC_DB_PASSWORD as string;
const host = process.env.NEXT_PUBLIC_URL_DB_HOST as string;
const database = process.env.NEXT_PUBLIC_DATABASE as string;

export const sequelize = new Sequelize(database, userName, password, {
  host: host,
  port: 3306,
  dialect: "mysql",
  dialectModule: require("mysql2"),
  benchmark: true,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ alter: true, force: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
