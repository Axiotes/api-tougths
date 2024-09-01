const { where } = require("sequelize");
const Tought = require("../models/Tought");
const User = require("../models/User");

module.exports = class ToughtController {
  static async showToughts(req, res) {
    res.send("Tela de home");
  }

  static async dashboard(req, res) {
    const userId = req.session.userid;

    const user = await User.findOne({
      where: { id: userId },
      include: Tought,
      plain: true,
    });

    if (!user) {
      res.send(false);
      return;
    }

    const toughts = user.Tought.map((result) => result.dataValues);

    res.send(toughts);
  }

  static async createTought(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    };

    await Tought.create(tought);

    res.flash("message", "Pensamento criado com sucesso");
  }

  static async removeTought(req, res) {
    const id = req.body.id;
    const userId = req.session.userid;

    await Tought.destroy({ where: { id: id, UserId: userId } });

    res.flash("message", "Pensamento removido com sucesso");
  }

  static async editTought(req, res) {
    const id = req.body.id;

    const tought = {
      title: req.body.title,
    };

    await Tought.update(tought, { where: { id: id } });

    res.flash("message", "Pensamento atualizado com sucesso");
  }
};
