const BtcUsd = require("../resources/btcusd/btcusd.model");
const { sequelize } = require("../../db/info");

async function operation() {
  await sequelize.authenticate();
  await BtcUsd.create({ a: "20" });
  await sequelize.close();
}

operation();
