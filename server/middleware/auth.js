const errorLoginUrl = ` ${process.env.CLIENT_URL}/login`;

module.exports.isUserAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).send("The user is not logged in");
        res.redirect(errorLoginUrl);
    }
};
