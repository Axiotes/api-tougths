const Tought = require("../models/Tought");
const User = require("../models/User");

module.exports = class ToughtController {
  static async showToughts(req, res) {
    res.send("Tela de home");
  }

  static async dashboard(req, res) {
    res.send("Tela de dashboard");
  }

  static async createTought(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    };

    await Tought.create(tought);

    res.flash("message", "Pensamento criado com sucesso");
  }
};
