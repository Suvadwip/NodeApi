const router = require("express").Router();
const controller = require("../controller/controller");

router.get("/", controller.showMessage);
router.post("/create", controller.createUser);
router.get("/userView", controller.userAllData);
router.get("/deleteData/:id",controller.deleteData);
router.post("/edit/:id",controller.editData);
module.exports = router;
