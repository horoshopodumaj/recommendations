import React, { useEffect, useState } from "react";
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

const userName = "VeryLongNameJed VeryLongSurnameDodds";

const likes = 45;
const totalRating = 3.7;
const totalLikes = 10;
const tags = [
    "book",
    "очень длинный тэг",
    "Робинзон Крузо",
    "Robinson Crusoe",
    "book",
    "очень длинный тэг",
    "Робинзон Крузо",
    "Robinson Crusoe",
    "book",
    "очень длинный тэг",
    "Робинзон Крузо",
    "Robinson Crusoe",
    "book",
    "очень длинный тэг",
    "Робинзон Крузо",
    "Robinson Crusoe",
    "book",
    "очень длинный тэг",
    "Робинзон Крузо",
    "Robinson Crusoe",
    "book",
    "очень длинный тэг",
    "Робинзон Крузо",
    "Robinson Crusoe",
    "book",
    "очень длинный тэг",
    "Робинзон Крузо",
    "Robinson Crusoe",
    "book",
    "очень длинный тэг",
    "Робинзон Крузо",
    "Robinson Crusoe",
];

export default function CardReviewFull({ post }) {
    const [rating, setRating] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [like, setLike] = useState(totalLikes);
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState({});

    //const title = "ЖИЗНЬ И УДИВИТЕЛЬНЫЕ ПРИКЛЮЧЕНИЯ РОБИНЗОНА КРУЗО";

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };
    console.log(post);
    const commentHandler = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                await axios
                    .get(`${URL}/api/user/profile/${post.userId}`)
                    .then((response) => setUser(response.data));
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [post]);
    console.log(user);
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
                            badgeContent={likes}
                            color="secondary"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}>
                            <UserAvatar width={"50px"} height={"50px"} name={userName} />
                        </Badge>
                    </Box>
                    <Typography
                        sx={{
                            mb: "10px",
                            fontWeight: 500,
                            textAlign: { xs: "center", sm: "left" },
                        }}>
                        {user.name}
                    </Typography>
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
                    <CardMedia component="img" height="auto" image="./img/1.jpg" alt="picture" />
                </Grid>
                <Grid item xs={12} md={9} sm={12}>
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
                                onChange={(event, newValue) => setRating(newValue)}
                                value={rating}
                            />
                        </Box>
                        <Typography
                            sx={{
                                fontStyle: "italic",
                                opacity: "0.8",
                                order: { xs: 1, sm: 2 },
                                mb: "10px",
                            }}>
                            <FormattedMessage id="published" />: data publish
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
                            <Rating name="authorAssessment" readOnly value={7} max={10} />
                        </Box>

                        <Typography
                            sx={{ fontStyle: "oblique", opacity: "0.8", textAlign: "right" }}>
                            <Link to="/books" style={{ textTransform: "capitalize" }}>
                                <FormattedMessage id="books" />
                            </Link>
                        </Typography>
                    </Box>

                    <CardContent sx={{ px: "0" }}>
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
                        <Typography sx={{ textAlign: "justify" }}>{post.description}</Typography>
                    </CardContent>
                    <CardActions
                        sx={{
                            flexDirection: "column",
                            px: "0",
                        }}>
                        <Box sx={{ overflow: "hidden" }}>
                            {tags.map((tag, index) => (
                                <Link
                                    key={index}
                                    className={style.tagslink}
                                    style={{ maxWidth: "80px", backgroundColor: grey[100] }}>
                                    <Typography sx={{ fontSize: "0.9rem" }} noWrap>
                                        {tag}
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
                                onClick={likeHandler}>
                                <ThumbUpIcon sx={{ fontSize: "24px" }} />
                            </IconButton>
                            <Typography
                                sx={{
                                    color: isLiked && "#3578fa",
                                    fontWeight: 500,
                                    mt: "7px",
                                    mr: "10px",
                                }}>
                                {like}
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
