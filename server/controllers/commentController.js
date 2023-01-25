const { Comment } = require("../models/models");

class CommentController {
    async create(req, res) {
        try {
            const { description, date, userId, reviewId } = req.body;
            const comment = await Comment.create({ description, date, userId, reviewId });
            return res.json(comment);
        } catch (error) {
            console.log(error);
        }
    }
    async getAllCommentsPost(req, res) {
        try {
            const { id } = req.params;
            const comments = await Comment.findAll({
                where: { reviewId: id },
            });
            return res.json(comments);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new CommentController();
