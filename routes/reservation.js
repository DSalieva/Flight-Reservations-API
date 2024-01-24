const router = require("express").Router();
const reservCtrl = require("../controllers/reservation");
const { isStaffOrAdmin } = require("../middlewares/permissions");

router.route("/").get(reservCtrl.list).post(reservCtrl.create);

router
  .route("/:id")
  .get(reservCtrl.read)
  .put(reservCtrl.update)
  .patch(reservCtrl.update)
  .delete(reservCtrl.delete);

router.get("/:id/passengers", reservCtrl.passengers);

module.exports = router;
