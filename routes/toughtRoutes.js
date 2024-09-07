const express = require("express");
const router = express.Router();
const ToughtController = require("../controllers/ToughtController");

const checkAuth = require("../middlewares/auth").checkAuth;

router.get("/:search?", ToughtController.showToughts);
router.get("/dashboard/:userId", checkAuth, ToughtController.dashboard);
router.get("/remove", checkAuth, ToughtController.removeTought);
router.post("/add/:userId", checkAuth, ToughtController.createTought);
router.post("/edit", checkAuth, ToughtController.editTought);

module.exports = router;
