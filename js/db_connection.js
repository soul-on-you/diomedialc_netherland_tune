import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export default new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PSWD}`,
  {
    host: "localhost",
    port: process.env.DB_PORT,
    dialect: "mariadb",
  }
);
