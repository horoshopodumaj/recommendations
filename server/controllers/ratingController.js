const { Star } = require("../models/models");

class StarController {
    async create(req, res) {
        try {
            const { value, userId, reviewId } = req.body;
            const rate = await Star.findOne({
                where: { userId: userId, reviewId: reviewId },
            });
            if (!rate) {
                const rate = await Star.create({ value, userId, reviewId });
            } else {
                const rate = await Star.update(
                    { value: value },
                    { where: { userId: userId, reviewId: reviewId } }
                );
            }

            const updatedOrNewRating = await Star.findOne({
                where: { userId: userId, reviewId: reviewId },
            });
            return res.json(updatedOrNewRating);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new StarController();
