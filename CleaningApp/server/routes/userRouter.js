const Router = require("express");
const passport = require("passport");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check);

router.post(
  "/google/",
  userController.googleLogin
);

module.exports = router;
