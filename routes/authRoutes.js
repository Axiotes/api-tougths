const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

const checkAuth = require("../middlewares/auth").checkAuth;

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/logout", AuthController.logout);
router.get("/logged-in", checkAuth);

module.exports = router;
