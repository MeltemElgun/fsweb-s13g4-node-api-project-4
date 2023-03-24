const uuid = require("uuid");

function getId() {
  return uuid.v1();
}

const initialUsers = () => {
  return [
    { id: getId(), kullaniciAdi: "veysel", sifre: "1234" },
    { id: getId(), kullaniciAdi: "veysel1", sifre: "1234" },
    { id: getId(), kullaniciAdi: "veysel2", sifre: "1234" },
    { id: getId(), kullaniciAdi: "veysel3", sifre: "1234" },
  ];
};

let users = initialUsers();

function getAllUsers() {
  return users;
}

function createNewUser(user) {
  user.id = getId();
  users.push(user);
  return user;
}

function findUser(user) {
  let isFind = false;
  for (let i = 0; i < users.length; i++) {
    const item = users[i];
    if (item.kullaniciAdi === user.kullaniciAdi && item.sifre === user.sifre) {
      isFind = true;
      break;
    }
  }
  return isFind;
}

function checkIsSameUserName(userName) {
  let isSameUserNameExist = users.find(
    (item) => item.kullaniciAdi === userName
  );
  return !!isSameUserNameExist;
}

module.exports = {
  getAllUsers,
  findUser,
  checkIsSameUserName,
  createNewUser,
};
