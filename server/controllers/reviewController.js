const uuid = require("uuid");
const path = require("path");
const { Review, Tag, TagReview } = require("../models/models");
const ApiError = require("../error/ApiError");

class ReviewController {
    async create(req, res, next) {
        try {
            let { title, workName, description, groupId, rating, userId, tag } = req.body;
            const { image } = req.files || {};
            let fileName = uuid.v4() + ".jpg";
            image && image.mv(path.resolve(__dirname, "..", "static", fileName));
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
                image: fileName || null,
            });
            console.log(tagsId, 5);
            tagsId.forEach(async (item) => {
                const id = item.id;
                const newRelation = await TagReview.create({ tagId: id, reviewId: review.id });
            });
            return res.json({ message: "success" });
        } catch (error) {
            next(ApiError.badRequest(error.message));
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
        const reviews = await Review.findAll({ where: { userId: id } });
        return res.json(reviews);
    }
    async getCategoryReviews(req, res) {
        const { id } = req.params;
        const reviews = await Review.findAll({ where: { groupId: id } });
        return res.json(reviews);
    }
}

module.exports = new ReviewController();
