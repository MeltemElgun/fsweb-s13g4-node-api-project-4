const express = require("express");
const cors = require("cors");
const {
  logger,
  validateNewUser,
  checkSameUserName,
  isValidUser,
} = require("./middleware");
const userModel = require("./user-model");

const server = express();
server.use(express.json());
server.use(logger);
server.use(cors());

server.get("/api/kullanicilar", (req, res, next) => {
  res.json(userModel.getAllUser());
});
server.post(
  "/api/kayitol",
  checkSameUserName,
  validateNewUser,
  (req, res, next) => {
    let user = req.user;
    let newUser = userModel.createNewUser(user);
    res.status(201).json(newUser);
  }
);
server.post("/api/giris", isValidUser, (req, res, next) => {
  res
    .status(201)
    .json({ message: "hoşgeldiniz" + " " + req.body.kullaniciAdi });
});

server.use((err, req, res, next) => {
  let status = err.status || 500;
  res.status(status).json({
    customMessage: "Bir hata oluştu, server noktasından bu mesaj yazıldı",
    message: err.message,
  });
});

module.exports = server;
