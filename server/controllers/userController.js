const ApiError = require("../error/ApiError");
const passport = require("passport");
const errorLoginUrl = ` ${process.env.CLIENT_URL}`;
const { User, Review, Group, Like } = require("../models/models");

class UserController {
    async googleCallback(req, res) {
        console.log("User", req.user);
        res.send("Thank you for signing in!");
    }

    async logoutUser(req, res) {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect(process.env.CLIENT_URL);
        });
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

    async getOne(req, res) {
        const { id } = req.params;
        console.log(id);
        const user = await User.findOne({
            where: { id },
            include: [
                {
                    model: Review,
                    where: { userId: id },
                    required: false,
                    include: [
                        {
                            model: Group,
                            attributes: ["id", "name"],
                        },
                        {
                            model: User,
                            attributes: ["id", "name"],
                        },
                        {
                            model: Like,
                            where: { value: true },
                            required: false,
                        },
                    ],
                },
            ],
        });
        return res.json(user);
    }
}

module.exports = new UserController();
