import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./CartReview.module.scss";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Collapse,
    Grid,
    Divider,
    IconButton,
    Rating,
    Typography,
    TextField,
    Badge,
    Avatar,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { FormattedMessage } from "react-intl";
import { grey } from "@mui/material/colors";
import { useFormatMessage } from "../../hooks/useFormatMessage";
import SendIcon from "@mui/icons-material/Send";
import UserAvatar from "../avatar/UserAvatar";
import axios from "axios";
import { URL } from "../../App";
import GlobalContext from "../../contexts/GlobalContext";

const userName = "VeryLongNameJed VeryLongSurnameDodds";

export default function CardReviewFull({ post, countUserLikes, getUserLikes }) {
    const { currentUser } = useContext(GlobalContext);

    const [userRating, setUserRating] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [totalLike, setTotalLike] = useState(post.likes.length);
    const [expanded, setExpanded] = useState(false);
    const [totalRating, setTotalRating] = useState(0);

    const ratingFromUser = () => {
        const userRatePosts = currentUser
            ? currentUser.stars.filter((star) => star.reviewId === post.id).length > 0
                ? currentUser.stars.filter((star) => star.reviewId === post.id)[0].value
                : 0
            : 0;
        setUserRating(userRatePosts);
    };

    const isUserLikesPost = () => {
        const userLikePosts = currentUser
            ? !!currentUser.likes.filter((like) => like.reviewId === post.id).length
            : false;
        setIsLiked(userLikePosts);
    };

    const totalRatingPost = useCallback(() => {
        const totalRating =
            post.stars.length > 0
                ? post.stars.reduce((acc, star) => acc + star.value, 0) / post.stars.length
                : 0;
        setTotalRating(totalRating);
    }, [post.stars]);

    const likeHandler = async () => {
        try {
            await axios
                .post(`${URL}/api/like`, {
                    value: !isLiked,
                    userId: currentUser.id,
                    reviewId: post.id,
                })
                .then((response) => setIsLiked(response.data.value));
            await axios
                .get(`${URL}/api/review/likes/${post.id}`)
                .then((response) => setTotalLike(response.data));
            getUserLikes(post.userId);
        } catch (error) {
            console.log(error);
        }
    };

    const ratingHandler = async (newValue) => {
        try {
            await axios
                .post(`${URL}/api/star`, {
                    value: Number(newValue),
                    userId: currentUser.id,
                    reviewId: post.id,
                })
                .then((response) => setUserRating(response.data.value));
            const newRating = await axios
                .get(`${URL}/api/review/stars/${post.id}`)
                .then((response) => response.data);
            setTotalRating(newRating.reduce((acc, rate) => acc + rate.value, 0) / newRating.length);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserLikes(post.userId);
        totalRatingPost();
    }, [getUserLikes, totalRatingPost, post.userId]);

    useEffect(() => {
        isUserLikesPost();
        ratingFromUser();
    }, []);

    const commentHandler = () => {
        setExpanded(!expanded);
    };

    const date = Date.parse(post.createdAt);

    return (
        <Card sx={{ mb: "30px" }}>
            <Grid container sx={{ padding: { xs: "20px 12px 0", sm: "25px 25px 0" } }} spacing={3}>
                <Grid item xs={12} md={3} sm={12}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "center", sm: "flex-start" },
                            mb: "10px",
                        }}>
                        <Badge
                            overlap="circular"
                            badgeContent={countUserLikes}
                            color="secondary"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}>
                            <UserAvatar width={"50px"} height={"50px"} name={post.user.name} />
                            {/* <Avatar sx={{ width: "50px", height: "50px" }} alt={post.user.name} /> */}
                        </Badge>
                    </Box>
                    <Link to={`/profile/${post.user.id}`}>
                        <Typography
                            sx={{
                                mb: "10px",
                                fontWeight: 500,
                                textAlign: { xs: "center", sm: "left" },
                            }}>
                            {post.user.name}
                        </Typography>
                    </Link>

                    <Typography
                        sx={{
                            mb: "10px",
                            textAlign: { xs: "center", sm: "left" },
                        }}>{`"${post.workName}"`}</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: { xs: "center", sm: "flex-start" },
                            flexDirection: { xs: "column", sm: "column" },
                            mb: "20px",
                        }}>
                        <Typography sx={{ fontStyle: "oblique", fontWeight: 500 }}>
                            <FormattedMessage id="overallRating" />
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Rating
                                readOnly
                                name="totalRating"
                                precision={0.1}
                                value={totalRating}
                            />
                            <Box
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    ml: "8px",
                                }}>{`${totalRating} / 5.0`}</Box>
                        </Box>
                    </Box>
                    {post.image && (
                        <CardMedia component="img" height="auto" image={post.image} alt="picture" />
                    )}
                </Grid>
                <Grid item xs={12} md={9} sm={12} sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: { xs: "column", sm: "row" },
                        }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: { xs: "column", sm: "row" },
                                order: { xs: 2, sm: 1 },
                                mb: "10px",
                            }}>
                            <Typography sx={{ mr: "10px", fontStyle: "oblique" }}>
                                <FormattedMessage id="yourRating" />
                            </Typography>
                            <Rating
                                name="yourRating"
                                onChange={(event) => ratingHandler(event.target.value)}
                                value={userRating}
                                readOnly={currentUser ? false : true}
                            />
                        </Box>
                        <Typography
                            sx={{
                                fontStyle: "italic",
                                opacity: "0.8",
                                order: { xs: 1, sm: 2 },
                                mb: "10px",
                            }}>
                            <FormattedMessage id="published" />:{" "}
                            {new Date(date).toLocaleDateString("ru-RU")}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: "10px",
                            flexDirection: { xs: "column", sm: "row" },
                        }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: { xs: "column", sm: "row" },
                                mb: "10px",
                            }}>
                            <Typography sx={{ mr: "10px", fontStyle: "oblique" }}>
                                <FormattedMessage id="authorAssessment" />
                            </Typography>
                            <Rating name="authorAssessment" readOnly value={post.rating} max={10} />
                        </Box>

                        <Typography
                            sx={{ fontStyle: "oblique", opacity: "0.8", textAlign: "right" }}>
                            <Link
                                to={`/${post.group.name}`}
                                style={{ textTransform: "capitalize" }}>
                                <FormattedMessage id={`${post.group.name}`} />
                            </Link>
                        </Typography>
                    </Box>
                    <CardContent
                        sx={{ px: "0", display: "flex", flexDirection: "column", flex: 1 }}>
                        <Link style={{ color: "black" }} to={`/review/${post.id}`}>
                            <Typography
                                noWrap
                                mb="10px"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: "1.25rem",
                                    textAlign: { xs: "center", sm: "left" },
                                }}>
                                {post.title}
                            </Typography>
                        </Link>

                        <Typography sx={{ textAlign: "justify" }}>{post.description}</Typography>
                    </CardContent>
                    <CardActions
                        sx={{
                            flexDirection: "column",
                            px: "0",
                            alignItems: "flex-start",
                        }}>
                        <Box sx={{ overflow: "hidden" }}>
                            {post.tags.length > 0 &&
                                post.tags.map((tag) => (
                                    <Link
                                        to={`/tag/${tag.id}`}
                                        key={tag.id}
                                        className={style.tagslink}
                                        style={{ maxWidth: "80px", backgroundColor: grey[100] }}>
                                        <Typography sx={{ fontSize: "0.9rem" }} noWrap>
                                            {tag.name}
                                        </Typography>
                                    </Link>
                                ))}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignSelf: "flex-end",
                                alignItems: "center",
                                marginTop: "10px",
                            }}>
                            <IconButton
                                sx={{
                                    padding: 0,
                                    color: isLiked && "#3578fa",
                                    mr: "8px",
                                }}
                                onClick={currentUser && likeHandler}>
                                <ThumbUpIcon sx={{ fontSize: "24px" }} />
                            </IconButton>
                            <Typography
                                sx={{
                                    color: isLiked && "#3578fa",
                                    fontWeight: 500,
                                    mt: "7px",
                                    mr: "10px",
                                }}>
                                {totalLike}
                            </Typography>
                            <IconButton
                                sx={{
                                    padding: 0,
                                    color: expanded && "#3578fa",
                                    mr: "8px",
                                }}
                                onClick={commentHandler}>
                                <ModeCommentIcon />
                            </IconButton>
                            <Typography
                                sx={{
                                    color: expanded && "#3578fa",
                                    fontWeight: 500,
                                    mt: "7px",
                                }}>
                                {113}
                            </Typography>
                        </Box>
                    </CardActions>
                </Grid>
            </Grid>
            <Collapse
                in={expanded}
                timeout="auto"
                sx={{ padding: { xs: "20px 12px 0", sm: "0 25px" }, marginBottom: "30px" }}>
                <Divider sx={{ mb: "15px", mx: "-25px" }} />
                {/* <Typography>Comments</Typography> */}
                <Grid container sx={{ flexDirection: { xs: "row" }, alignItems: "center" }}>
                    <Grid item xs={2} md={3} sx={{ display: { xs: "none", sm: "block" } }}>
                        <Box sx={{ mr: { xs: "0", md: "20px" }, mb: { xs: "10px" } }}>
                            <UserAvatar width={"40px"} height={"40px"} name={userName} />
                        </Box>

                        <Box sx={{ display: { xs: "none", md: "inline-block" } }}>
                            <Link to="/profile">
                                <Typography
                                    sx={{
                                        mb: "10px",
                                        textAlign: { xs: "left" },
                                        fontSize: { xs: "0.9rem", sm: "1rem" },
                                    }}>
                                    {userName}
                                </Typography>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={10}
                        md={9}
                        sx={{
                            display: "flex",
                            //alignItems: "center",
                            flexDirection: { xs: "column" },
                            justifyContent: "center",
                        }}>
                        <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                            <Link to="/profile">
                                <Typography
                                    sx={{
                                        mb: "10px",
                                        textAlign: { xs: "left" },
                                        fontSize: { xs: "0.9rem", sm: "1rem" },
                                    }}>
                                    {userName}
                                </Typography>
                            </Link>
                        </Box>

                        <Grid container sx={{ alignItems: "center" }}>
                            <Grid item xs={11}>
                                <TextField
                                    fullWidth
                                    placeholder={useFormatMessage("writeComment")}></TextField>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton>
                                    <SendIcon sx={{ color: "primary.main" }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Collapse>
        </Card>
    );
}
