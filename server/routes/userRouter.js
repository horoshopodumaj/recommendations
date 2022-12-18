const Router = require("express");
const passport = require("passport");
const router = new Router();
const userController = require("../controllers/userController");
const { googleLogin, googleCallback } = require("../middleware/SocialMedia");
// const successLoginUrl = `${process.env.CLIENT_URL}/books`;
// const errorLoginUrl = ` ${process.env.CLIENT_URL}/login`;

//router.post("/registration", userController.registration);
//router.post("/login", userController.login);
router.get("/login/google", googleLogin);
router.get("/auth/google/callback", googleCallback, userController.googleCallback);

router.get("/auth", userController.check);

module.exports = router;
