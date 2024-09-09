require('dotenv').config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: "mysql",
  port: process.env.PORT,
});

try {
  sequelize.authenticate();
  console.log("Conectado ao banco de dados");
} catch (err) {
  console.log(err);
}

module.exports = sequelize;
