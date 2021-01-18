const BtcUsd = require("../../../resources/btcusd/btcusd.model");
const { sequelize } = require("../../db/info");
const { Op } = require("sequelize");

async function operation() {
  await sequelize.authenticate();
  const results = await BtcUsd.findAll({
    where: {
      createdAt: {
        [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
      },
    },
  });
  console.log("results", JSON.parse(results));
  await sequelize.close();
}

operation();
