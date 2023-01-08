const passport = require("passport");

const successLoginUrl = `${process.env.CLIENT_URL}`;
const errorLoginUrl = ` ${process.env.SERVER_URL}/api/user/login/failed`;

module.exports.googleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

module.exports.googleCallback = passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
});
module.exports.githubLogin = passport.authenticate("github", { scope: ["profile", "email"] });

module.exports.githubCallback = passport.authenticate("github", {
    failureMessage: "Cannot login to GitHub, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
});
module.exports.facebookLogin = passport.authenticate("facebook", { scope: ["profile", "email"] });

module.exports.facebookCallback = passport.authenticate("facebook", {
    failureMessage: "Cannot login to Facebook, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
});
module.exports.twitterLogin = passport.authenticate("twitter", { scope: ["profile", "email"] });

module.exports.twitterCallback = passport.authenticate("twitter", {
    failureMessage: "Cannot login to Twitter, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
});
