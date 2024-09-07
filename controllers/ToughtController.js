const { where } = require("sequelize");
const Tought = require("../models/Tought");
const User = require("../models/User");

const { Op } = require("sequelize");

module.exports = class ToughtController {
  static async showToughts(req, res) {
    let search = req.params.search;
    let toughtsData;

    if (search) {
      toughtsData = await Tought.findAll({
        include: User,
        where: {
          title: { [Op.like]: `%${search}%` },
        },
      });
    } else {
      toughtsData = await Tought.findAll({
        include: User,
      });
    }

    const toughts = toughtsData.map((result) => result.get({ plain: true }));

    res.send(toughts);
  }

  static async dashboard(req, res) {
    const userId = req.body.userId;

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
      UserId: req.body.userId,
    };

    try {
      await Tought.create(tought);

      res.send({ message: "Pensamento criado com sucesso", tought: true });
    } catch (err) {
      console.log(err);
      res.send({
        message: "Erro ao criar pensamento! Tente novamente",
        tought: false,
      });
    }
  }

  static async removeTought(req, res) {
    const id = req.body.id;
    const userId = req.body.userId;

    await Tought.destroy({ where: { id: id, UserId: userId } });

    res.send({
      message: "Pensamento removido com sucesso",
      tought: false,
    });
  }

  static async editTought(req, res) {
    const id = req.body.id;

    const tought = {
      title: req.body.title,
    };

    await Tought.update(tought, { where: { id: id } });

    res.send({
      message: "Pensamento atualizado com sucesso",
      tought: true,
    });
  }
};
