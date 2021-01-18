const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "escxzffn",
  "escxzffn",
  "G5oHYvnJAymbrnDRl3q70Li65qyidoIz",
  {
    host: "kandula.db.elephantsql.com",
    dialect: "postgres",
  }
);

module.exports = { sequelize };
