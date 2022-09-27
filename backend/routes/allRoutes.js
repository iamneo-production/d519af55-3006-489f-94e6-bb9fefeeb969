const router = require("express").Router();
const userCtrl = require("../controllers/userControllers");
// const auth = require("../middleware/auth");
// const authAdmin = require("../middleware/authAdmin");

router.post("/login", userCtrl.login);

router.post("/signup", userCtrl.register);

router.get("/Admin", userCtrl.getTrainers);
router.post("/Admin/add", userCtrl.addTrainer);
router.put("/Admin/update/:id", userCtrl.updateTrainer);
router.delete("/Admin/remove/:id", userCtrl.deleteTrainer);

module.exports = router;