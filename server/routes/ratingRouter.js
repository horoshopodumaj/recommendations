const Router = require("express");
const router = new Router();
const StarController = require("../controllers/ratingController");

router.post("/", StarController.create);

module.exports = router;
