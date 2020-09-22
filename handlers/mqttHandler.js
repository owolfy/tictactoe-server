const mqtt = require("mqtt");

class MqttHandler {
  constructor() {
    this.mqttClient = mqtt.connect("mqtt://broker.hivemq.com");
  }

  connect() {
    this.mqttClient.on("error", (err) => {
      console.log("err", err);
      this.mqttClient.end();
    });

    this.mqttClient.on("connect", () => {
      this.mqttClient.subscribe("player-move", { qos: 0 }, (move) => {
        this.notifyPlayers(move);
      });
    });

    this.mqttClient.on("close", () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // emit

  notifyPlayers(message) {
    // notify the players' UI where to put the 'X' or 'Y';
    this.mqttClient.publish("move-update", message);
  }
}

module.exports = MqttHandler;
