const router = require("express").Router();
const passCtrl = require("../controllers/passenger");
const { isStaffOrAdmin } = require("../middlewares/permissions");

router.use(isStaffOrAdmin);

router.route("/").get(passCtrl.list).post(passCtrl.create);

router
  .route("/:id")
  .get(passCtrl.read)
  .put(passCtrl.update)
  .patch(passCtrl.update)
  .delete(passCtrl.delete);

module.exports = router;
