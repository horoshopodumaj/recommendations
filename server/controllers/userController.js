const ApiError = require("../error/ApiError");
const passport = require("passport");
const errorLoginUrl = ` ${process.env.CLIENT_URL}`;
const { User, Review, Group, Like, Star, TagReview, Tag } = require("../models/models");
const { validationResult } = require("express-validator");

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                });
            }
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (error) {
            res.status(500).json({ message: error.message });
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            console.log(userData);
            return res.json(userData);
        } catch (error) {
            res.status(500).json({ message: error.message });
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.json(token);
        } catch (error) {
            next(error);
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

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
        try {
            if (req.user) {
                const user = await User.findOne({
                    where: { id: req.user.id },
                    include: [
                        {
                            model: Like,
                            where: { value: true },
                            required: false,
                        },
                        {
                            model: Star,
                            required: false,
                        },
                    ],
                });
                res.status(200).json({
                    success: true,
                    message: "successfull",
                    user: user,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async successGoogle(req, res) {
        try {
            const user = await User.findOne({
                where: { id: 1 },
                include: [
                    {
                        model: Like,
                        where: { value: true },
                        required: false,
                    },
                    {
                        model: Star,
                        required: false,
                    },
                ],
            });
            res.status(200).json({
                success: true,
                message: "successfull",
                user: user,
            });
        } catch (error) {
            console.log(error);
        }
    }
    async successGithub(req, res) {
        try {
            const user = await User.findOne({
                where: { id: 2 },
                include: [
                    {
                        model: Like,
                        where: { value: true },
                        required: false,
                    },
                    {
                        model: Star,
                        required: false,
                    },
                ],
            });
            res.status(200).json({
                success: true,
                message: "successfull",
                user: user,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        let { limit, page } = req.query;
        page = page || 1;
        limit = limit || 3;
        let offset = page * limit - limit;
        const user = await User.findOne({
            where: { id },
        });

        const reviews = await Review.findAndCountAll({
            where: { userId: user.id },
            limit,
            offset,
            distinct: "Review.id",
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
                {
                    model: Star,
                    required: false,
                    attributes: ["id", "value", "userId"],
                },
                {
                    model: Tag,
                    required: false,
                },
            ],
        });
        const { count } = await Review.findAndCountAll({
            where: { userId: user.id },
            include: [
                {
                    model: Like,
                    where: { value: true },
                },
            ],
        });
        return res.json({ user, reviews, count });
    }

    async getUserLikes(req, res) {
        try {
            const { id } = req.params;
            const { count } = await Review.findAndCountAll({
                where: { userId: id },
                include: [
                    {
                        model: Like,
                        where: { value: true },
                    },
                ],
            });
            return res.json({ count });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserController();
