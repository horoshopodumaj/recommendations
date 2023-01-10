const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const tokenService = require("./tokenService");
const mailService = require("./mailService");
const ApiError = require("../exceptions/apiError");

class UserService {
    async registration(name, lastName, email, password) {
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            throw ApiError.BadRequest("A user with this email already exists");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink = uuid.v4();
        const user = await User.create({
            name: `${name} ${lastName}`,
            email,
            password: hashPassword,
            activationLink,
        });
        await mailService.sendActivationMail(
            email,
            `${process.env.SERVER_URL}/api/activate/${activationLink}`
        );

        //const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ email });
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user,
        };
    }

    async activate(activationLink) {
        const user = await User.findOne({ where: { activationLink } });
        if (!user) {
            throw ApiError.BadRequest("Некорректная ссылка активации");
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw ApiError.BadRequest("The user is not found, please register");
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest("Invalid password, try again");
        }
        //const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ email });
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user,
        };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenInDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenInDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findOne({ where: { id: userData.id } });
        //const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userData });
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user,
        };
    }
}

module.exports = new UserService();
