const Tought = require("../models/Tought");
const User = require("../models/User");

module.exports = class ToughtController {
  static async showToughts(req, res) {
    res.send("Tela de home");
  }

  static async dashboard(req, res) {
    res.send("Tela de dashboard");
  }
};
