const userModel = require("./user-model");

function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toLocaleString();
  console.log(`${timestamp}--${method}--${url}`);
  next();
}

function validateNewUser(req, res, next) {
  try {
    const { kullaniciAdi, sifre } = req.body;
    if (!kullaniciAdi || !sifre) {
      res.status(400).json({ message: "Eksik alan var" });
    } else {
      req.user = { kullaniciAdi: kullaniciAdi, sifre: sifre };
      next();
    }
  } catch (error) {
    next(error);
  }
}

function checkSameUserName(req, res, next) {
  try {
    const { kullaniciAdi } = req.body;
    const İsSame =
      !!kullaniciAdi && userModel.checkIsSameUserName(kullaniciAdi);
    if (İsSame) {
      // true ise aynı kullanıcıdan var
      res.status(400).json({ message: "Aynı kullanıcı adı mevcut" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}
function isValidUser(req, res, next) {
  try {
    const user = { kullaniciAdi: req.body.kullaniciAdi, sifre: req.body.sifre };
    const isExist = userModel.findUser(user);
    if (!isExist) {
      res.status(404).json({ message: "Böyle bir kullanıcı yok" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}
module.exports = {
  logger,
  validateNewUser,
  checkSameUserName,
  isValidUser,
};
