const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const reviewRouter = require("./reviewRouter");
const groupRouter = require("./groupRouter");
const likeRouter = require("./likeRouter");
const tagRouter = require("./tagRouter");

router.use("/user", userRouter);
router.use("/review", reviewRouter);
router.use("/group", groupRouter);
router.use("/like", likeRouter);
router.use("/tag", tagRouter);

module.exports = router;
