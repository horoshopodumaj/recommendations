const Router = require("express");
const passport = require("passport");
const router = new Router();
const userController = require("../controllers/userController");

const successLoginUrl = `${process.env.CLIENT_URL}/books`;
const errorLoginUrl = ` ${process.env.CLIENT_URL}/login`;

//router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/login/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureMessage: "Cannot login to Google, please try again later!",
        failureRedirect: errorLoginUrl,
        successRedirect: successLoginUrl,
    }),
    (req, res) => {
        console.log("User", req.user);
        res.send("Thank you for signing in!");
    }
);

router.get("/auth", userController.check);

module.exports = router;
