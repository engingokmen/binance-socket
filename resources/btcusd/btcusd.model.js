const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../utils/db/info");

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

module.exports = BtcUsd;
