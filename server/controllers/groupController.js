const { Group } = require("../models/models");
const ApiError = require("../error/ApiError");

class GroupController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const group = await Group.create({ name });
            return res.json(group);
        } catch (error) {
            console.log(error);
        }
    }
    async getAll(req, res) {
        try {
            const group = await Group.findAll();
            return res.json(group);
        } catch (error) {
            console.log(error);
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const group = await Group.findOne({ where: { id } });
            return res.json(group);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new GroupController();
