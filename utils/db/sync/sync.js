const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../db/info");

class BtcUsd extends Model {}

BtcUsd.init(
  {
    a: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    updatedAt: false,
    tableName: "btcusd",
    modelName: "BtcUsd",
  }
);

async function syncModels() {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
  await sequelize.close();
}

syncModels();
