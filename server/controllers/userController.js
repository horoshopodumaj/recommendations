const ApiError = require("../error/ApiError");
const passport = require("passport");
const errorLoginUrl = ` ${process.env.CLIENT_URL}/login`;

class UserController {
    async googleCallback(req, res) {
        console.log("User", req.user);
        res.send("Thank you for signing in!");
    }

    async logout(req, res) {
        req.logout();
        res.redirect(errorLoginUrl);
    }

    async check(req, res, next) {
        res.status(200).json({
            success: true,
            message: "Welcome!",
            user: req.user,
        });
    }

    async failed(req, res) {
        res.status(401).json({
            success: false,
            message: "failure",
        });
    }

    async success(req, res) {
        console.log(req.user);
        if (req.user) {
            res.status(200).json({
                success: true,
                message: "successfull",
                user: req.user,
            });
        }
    }
}

module.exports = new UserController();
