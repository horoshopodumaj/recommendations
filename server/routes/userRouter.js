const Router = require("express");
const passport = require("passport");
const router = new Router();
const userController = require("../controllers/userController");
const { googleLogin, googleCallback } = require("../middleware/SocialMedia");
const { isUserAuthenticated } = require("../middleware/auth");
// const successLoginUrl = `${process.env.CLIENT_URL}/books`;
//const errorLoginUrl = ` ${process.env.CLIENT_URL}/login`;

//router.post("/registration", userController.registration);
//router.post("/login", userController.login);
router.get("/login/google", googleLogin);
router.get("/auth/google/callback", googleCallback, userController.googleCallback);
router.get("/logout", userController.logout);
router.get("/auth", isUserAuthenticated, userController.check);

module.exports = router;
