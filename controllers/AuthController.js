const User = require("../models/User");

const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!user || !passwordMatch) {
      res.send({ message: "Email ou senha inválido", registered: false });

      return;
    }

    res.send({ message: "", registered: true, userId: user.id });
  }

  static async register(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res.send({
        message: "As senhas não conferem, tente novamente!",
        registered: false,
      });

      return;
    }

    const checkUser = await User.findOne({ where: { email: email } });

    if (checkUser) {
      res.send({
        message: "Email já cadastrado",
        registered: false,
      });

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
      const newUser = await User.create(user);

      res.send({
        message: "Cadastro realizado com sucesso",
        registered: true,
        userId: newUser.id,
      });
    } catch (err) {
      console.log(err);
      res.send({
        message: "Erro ao cadastrar",
        registered: false,
      });
    }
  }
};
