const ApiError = require("../error/ApiError");
const passport = require("passport");

const successLoginUrl = "http://localhost:3000/books";
const errorLoginUrl = "http://localhost:3000/films";

class UserController {
    async registration(req, res) {}
    async login(req, res) {}

    async check(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest("Id not set"));
        }
        res.json(id);
    }
}

module.exports = new UserController();
