const User = require("../models/User");

const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.send("Login");
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!user || !passwordMatch) {
      res.flash("message", "Email ou senha inválido");

      return;
    }

    req.session.userid = user.id;

    req.session.save();
  }

  static register(req, res) {
    res.send("Cadastro");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      req.flash("message", "As senhas não conferem, tente novamente!");

      return;
    }

    const checkUser = await User.findOne({ where: { email: email } });

    if (checkUser) {
      req.flash("message", "Email já cadastrado");

      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      await User.create(user);

      req.session.userid = user.id;

      req.flash("message", "Cadastro realizado com sucesso");

      req.session.save();
    } catch (err) {
      console.log(err);
      req.flash("message", "Erro ao cadastrar");
    }
  }

  static logout(req, res) {
    req.session.destroy();
  }
};
