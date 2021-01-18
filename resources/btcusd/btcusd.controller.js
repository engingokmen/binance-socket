const { Op } = require("sequelize");
const BtcUsd = require("./btcusd.model");

const { isEqualWithPrevious } = require("../../utils/functions");

async function getLast24() {
  const results = await BtcUsd.findAll({
    where: {
      createdAt: {
        [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
      },
    },
  });
  return results;
}

async function post(currentData) {
  if (!isEqualWithPrevious(currentData)) {
    await BtcUsd.create({ a: currentData });
  }
}

function scheduleRemovalOfPastData() {
  const initialTime = 48 * 60 * 60 * 1000;
  const recurrentTime = 24 * 60 * 60 * 1000;

  function deleteData() {
    BtcUsd.bulkDelete(btcusd, {
      createdAt: { [Op.lt]: new Date(new Date() - 24 * 60 * 60 * 1000) },
    });
  }

  let initialTimeout = setTimeout(() => {
    deleteData();
    timeInterval();
    clearTimeout(initialTimeout);
  }, initialTime);

  let timeInterval = setInterval(() => {
    deleteData();
  }, recurrentTime);

  initialTimeout();
}

module.exports = { getLast24, post, scheduleRemovalOfPastData };
