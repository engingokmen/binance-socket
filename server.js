const WebSocket = require("ws");
const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const webSocketServer = new WebSocket.Server({ server });
const { sequelize } = require("./utils/db/info");
const { getLast24, post } = require("./resources/btcusd/btcusd.controller");
const { isGreaterThanMinElapsedTime } = require("./utils/functions");
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "public")));

const binanceConnection = new WebSocket(
  "wss://stream.binance.com:9443/ws/btcusdt@bookTicker"
);

// web socket server - client connection
function connection() {
  // recording to database
  binanceConnection.onmessage = async function (evt) {
    // sending recent btcUsd value to client
    webSocketServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(evt.data);
      }
    });
    // sending recent btcUsd value to database (if minimum 3 seconds passed from previous record time AND updated)
    if (isGreaterThanMinElapsedTime()) {
      await post(JSON.parse(evt.data).a);
      const source = await getLast24();
      webSocketServer.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(source));
        }
      });
    }
  };

  binanceConnection.onerror = function (evt) {
    console.error("an error occurred", evt.data);
  };
}

async function startApp() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    scheduleRemovalOfPastData(); //schedule to remove past data from database
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  server.listen(port, () => console.log("server listening on port " + port));
  webSocketServer.on("listening", connection);
}

startApp();
