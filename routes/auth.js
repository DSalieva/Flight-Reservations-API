const router = require("express").Router();
const authCtrl = require("../controllers/auth");

router.post("/login", authCtrl.login);
router.post("/refresh", authCtrl.refresh);
router.get("/logout", authCtrl.logout);

module.exports = router;
