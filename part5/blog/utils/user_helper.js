const User = require("../models/user");
const initialUsers = [
  {
    username: "Mike",
    name: "Micheal Jordan",
    password: "mikey123",
    _id: "61d989c92269a3a011eb3da0",
  },
  {
    username: "Poker",
    name: "Pommy King",
    password: "fso43",
    _id: "61d98af32269a3a011eb3da1",
  },
];
const usersInDb = async () => {
  const users = await User.find({});
  const processedUsers = users.map((user) => user.toJSON());
  return processedUsers;
};

module.exports = {
  initialUsers,
  usersInDb,
};
