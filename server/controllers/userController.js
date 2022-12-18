const ApiError = require("../error/ApiError");
const passport = require("passport");

class UserController {
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
