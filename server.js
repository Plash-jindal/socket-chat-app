var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var http = require("http").Server(app);
var dotenv = require("dotenv").config();
var io = require("socket.io")(http);

var mongoose = require("mongoose");

var MessageModel = mongoose.model("Message", {
  name: String,
  message: String
});

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var messages = [];

app.get("/messages", async (req, res) => {
  try {
    var messages = await MessageModel.find();
    res.send(messages);
  } catch (error) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/messages", async (req, res) => {
  try {
    var message = new MessageModel(req.body);

    var newMessage = await message.save();

    io.emit("message", req.body);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

io.on("connection", socket => {
  console.log("user connected");
});

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }, err => {
  console.log("mongodb connection", err);
});

const server = http.listen(3000, err => {
  if (err) throw err;
  else console.log("server is running at ", server.address().port);
});
