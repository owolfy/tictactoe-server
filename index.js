var express = require("express");
var bodyParser = require("body-parser");
var mqttHandler = require("./handlers/mqttHandler");

var app = express(); // init express
var mqttClient = new mqttHandler();
mqttClient.connect();

var PORT = process.env.PORT || 8083;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

// ROUTES

app.get("/", function (req, res) {
  res.send("hello");
});
