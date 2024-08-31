const User = require("../models/User");

module.exports = class AuthController {
  static login(req, res) {
    res.send("Login");
  }

  static register(req, res) {
    res.send("Cadastro");
  }
};
