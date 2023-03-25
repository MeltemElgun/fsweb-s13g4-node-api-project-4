const uuid = require("uuid");
function getId() {
  return uuid.v1();
}
const initialUsers = () => {
  return [
    { id: getId(), kullaniciAdi: "meltem", sifre: "1234" },
    { id: getId(), kullaniciAdi: "serhat", sifre: "1234" },
    { id: getId(), kullaniciAdi: "seren", sifre: "1234" },
    { id: getId(), kullaniciAdi: "ali", sifre: "1234" },
  ];
};

let users = initialUsers();

function getAllUser() {
  return users;
}
function createNewUser(user) {
  user.id = getId();
  users.push(user);
  return user;
}
function findUser(user) {
  let İsFind = false;
  for (let i = 0; i < users.length; i++) {
    const item = users[i];
    if (item.kullaniciAdi === user.kullaniciAdi && item.sifre === user.sifre) {
      İsFind = true;
      break;
    }
  }
  return İsFind;
}

function checkIsSameUserName(userName) {
  //opsiyonel eklendi
  let nameExist = users.find((item) => item.kullaniciAdi === userName);
  return !!nameExist; //boş değil TRUE FALSE DEĞER DÖNER
}
module.exports = {
  getAllUser,
  createNewUser,
  findUser,
  checkIsSameUserName,
};
