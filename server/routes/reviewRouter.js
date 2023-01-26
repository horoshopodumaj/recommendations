const Router = require("express");
const router = new Router();
const reviewController = require("../controllers/reviewController");

router.post("/", reviewController.create);
router.post("/update/:id", reviewController.update);
router.get("/", reviewController.getAll);
router.get("/latest", reviewController.getLatestReviews);
router.get("/:id", reviewController.getOne);
//router.get("/user/:id", reviewController.getUserReviews);
router.get("/category/:id", reviewController.getCategoryReviews);
router.get("/likes/:id", reviewController.getTotalLikes);
router.get("/stars/:id", reviewController.getTotalRating);

module.exports = router;
