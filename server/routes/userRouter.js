const Router = require("express");
const passport = require("passport");
const router = new Router();
const userController = require("../controllers/userController");
const {
    googleLogin,
    googleCallback,
    githubLogin,
    githubCallback,
    facebookLogin,
    facebookCallback,
} = require("../middleware/SocialMedia");
const { isUserAuthenticated } = require("../middleware/auth");
// const successLoginUrl = `${process.env.CLIENT_URL}/books`;
//const errorLoginUrl = ` ${process.env.CLIENT_URL}/login`;

//router.post("/registration", userController.registration);
//router.post("/login", userController.login);
router.get("/login/google", googleLogin);
router.get("/auth/google/callback", googleCallback, userController.googleCallback);
router.get("/login/github", githubLogin);
router.get("/auth/github/callback", githubCallback, userController.googleCallback);
router.get("/login/facebook", facebookLogin);
router.get("/auth/facebook/callback", facebookCallback, userController.googleCallback);
router.get("/logout", userController.logoutUser);
router.get("/auth", isUserAuthenticated, userController.check);
router.get("/login/failed", userController.failed);
router.get("/login/success", userController.success);
router.get("/profile/:id", userController.getOne);
router.get("/likes/:id", userController.getUserLikes);

module.exports = router;
