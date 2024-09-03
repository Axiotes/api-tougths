const User = require("../models/User");

module.exports.checkAuth = async function (req, res, next) {
  const id = req.body.userId;
  const userId = await User.findOne({ where: { id: id } });

  if (!userId) {
    res.send("Usuário inválido");

    return;
  }

  next();
};
