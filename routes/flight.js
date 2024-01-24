const router = require("express").Router();
const flightCtrl = require("../controllers/flight");
const { isStaffOrAdmin } = require("../middlewares/permissions");

router.use(isStaffOrAdmin);

router.route("/").get(flightCtrl.list).post(flightCtrl.create);

router
  .route("/:id")
  .get(flightCtrl.read)
  .put(flightCtrl.update)
  .patch(flightCtrl.update)
  .delete(flightCtrl.delete);

router.get("/:id/passengers", flightCtrl.passengers);

module.exports = router;
