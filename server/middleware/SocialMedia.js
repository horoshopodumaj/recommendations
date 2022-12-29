const passport = require("passport");

const successLoginUrl = `${process.env.CLIENT_URL}`;
const errorLoginUrl = ` ${process.env.SERVER_URL}/api/user/login/failed`;

module.exports.googleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

module.exports.googleCallback = passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
});
