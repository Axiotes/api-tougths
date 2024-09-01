const express = require("express");
const router = express.Router();
const ToughtController = require("../controllers/ToughtController");

const checkAuth = require("../middlewares/auth").checkAuth;

router.get("/", ToughtController.showToughts);
router.get("/dashboard", checkAuth, ToughtController.dashboard);
router.post("/add", checkAuth, ToughtController.createTought);

module.exports = router;
