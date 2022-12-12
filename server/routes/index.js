const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const reviewRouter = require("./reviewRouter");
const groupRouter = require("./groupRouter");
const likeRouter = require("./likeRouter");

router.use("/user", userRouter);
router.use("/review", reviewRouter);
router.use("/group", groupRouter);
router.use("/like", likeRouter);

module.exports = router;
