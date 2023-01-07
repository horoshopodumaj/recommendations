const { Tag, User, Group, Like, Star, Review } = require("../models/models");
const ApiError = require("../error/ApiError");

class TagController {
    async create(req, res) {
        const { name } = req.body;
        const tag = await Tag.create({ name });
        return res.json(tag);
    }
    async getAll(req, res) {
        const tags = await Tag.findAll();
        return res.json(tags);
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            // let { limit, page } = req.query;
            // page = page || 1;
            // limit = limit || 3;
            // let offset = page * limit - limit;
            const tag = await Tag.findOne({
                where: { id },
                order: [[Review, "createdAt", "DESC"]],
                include: [
                    {
                        model: Review,
                        include: [
                            {
                                model: User,
                                attributes: ["id", "name", "role"],
                            },
                            {
                                model: Group,
                                attributes: ["id", "name"],
                            },
                            {
                                model: Like,
                                where: { value: true },
                                attributes: ["id", "value", "userId"],
                                required: false,
                            },
                            {
                                model: Star,
                                attributes: ["id", "value", "userId"],
                                required: false,
                            },
                            {
                                model: Tag,
                                required: false,
                            },
                        ],
                    },
                ],
            });
            return res.json(tag);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new TagController();
