const express = require("express");
const router = express.Router();
const ToughtController = require("../controllers/ToughtController");

const checkAuth = require("../middlewares/auth").checkAuth;

router.get("/", ToughtController.showToughts);
router.get("/dashboard", checkAuth, ToughtController.dashboard);

module.exports = router;
