const mongoose = require("mongoose");
const User = require("../models/user");
const app = require("../app");
const supertest = require("supertest");
const helper = require("../utils/user_helper");
const bcrypt = require("bcrypt");
const api = supertest(app);

describe("when no users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  test("adding a user with proper username and password works", async () => {
    const user = {
      name: "Mike",
      username: "mikeXXgamer",
      password: "minecraft",
    };
    const createdUser = await api
      .post("/api/users")
      .expect(201)
      .send(user)
      .expect("Content-Type", /application\/json/);
    const finalUsers = await helper.usersInDb();
    expect(finalUsers.length).toBe(1);
    expect(finalUsers).toContainEqual(createdUser.body);
  });
  test("adding a user not works for invalid username", async () => {
    const user = {
      name: "nomeansno",
      password: "noproblem",
      username: "no",
    };
    await api.post("/api/users").send(user).expect(400);
  });
  test("adding a user not works for invalid password", async () => {
    const user = {
      name: "imsorry",
      password: "no",
      username: "sacrificesmustbemade",
    };
    await api.post("/api/users").send(user).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
