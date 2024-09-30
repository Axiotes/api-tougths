const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user._id,
    }, "secret");

    res.status(200).json({
        message: "Usuário autenticado",
        token: token,
        userId: user._id,
        registered: true,
    });
}

module.exports = createUserToken;