const passport = require("passport");

const successLoginUrl = `${process.env.CLIENT_URL}/books`;
const errorLoginUrl = ` ${process.env.CLIENT_URL}/login`;

module.exports.googleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

module.exports.googleCallback = passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
});
