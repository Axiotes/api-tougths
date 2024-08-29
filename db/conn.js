const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_toughts", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 3307,
});

try {
  sequelize.authenticate();
  console.log("Conectado ao banco de dados");
} catch (err) {
  console.log(err);
}

module.exports = sequelize;
