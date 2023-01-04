const uuid = require("uuid");
const cloudinary = require("../utils/cloudinary");
const { Review, Tag, TagReview, User, Group, Like } = require("../models/models");
const ApiError = require("../error/ApiError");

class ReviewController {
    async create(req, res, next) {
        try {
            let { title, workName, description, groupId, rating, userId, tag, image } = req.body;
            let uploadResponse;
            if (!!!image) {
                uploadResponse = await cloudinary.uploader.upload(image, {
                    folder: "recommend",
                });
            } else {
                console.log(54);
                uploadResponse = {
                    secure_url: null,
                };
            }
            tag = JSON.parse(tag);
            const newTags = tag.filter((item) => item.inputValue);
            const tagsId = tag.filter((item) => item.id);
            newTags.forEach(async (item) => {
                const name = item.name;
                const newTagId = await Tag.create({ name });
                tagsId.push(newTagId.dataValues);
            });
            const review = await Review.create({
                title,
                workName,
                description,
                groupId,
                rating,
                userId,
                image: uploadResponse.secure_url,
            });
            tagsId.forEach(async (item) => {
                const id = item.id;
                const newRelation = await TagReview.create({ tagId: id, reviewId: review.id });
            });
            return res.json({ message: "success" });
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(req, res) {
        let { groupId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let reviews;
        if (groupId) {
            reviews = await Review.findAndCountAll({ where: { groupId }, limit, offset });
        } else {
            reviews = await Review.findAndCountAll({ limit, offset });
        }
        return res.json(reviews);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const review = await Review.findOne({ where: { id } });
        return res.json(review);
    }
    async getUserReviews(req, res) {
        const { id } = req.params;
        const reviews = await Review.findAll({
            where: { userId: id },
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "role"],
                },
                {
                    model: Group,
                    attributes: ["id", "name"],
                },
            ],
        });
        return res.json(reviews);
    }
    async getCategoryReviews(req, res) {
        const { id } = req.params;
        const reviews = await Review.findAll({
            where: { groupId: id },
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
                    required: false,
                },
            ],
        });
        return res.json(reviews);
    }

    async getLatestReviews(req, res) {
        let { limit } = req.query;
        let queryParams = {
            where: {},
            order: [["createdAt", "DESC"]],
            limit: limit || 4,
        };

        const reviews = await Review.findAll(queryParams);
        return res.json(reviews);
    }
}

module.exports = new ReviewController();
