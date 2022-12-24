import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./CartReview.module.scss";
import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    Rating,
    Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { FormattedMessage } from "react-intl";
import { grey } from "@mui/material/colors";

function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
}
const userName = "VeryLongNameJed VeryLongSurnameDodds";
const userInfo = { ...stringAvatar(userName) };

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

export default function CardReviewFull() {
    const [rating, setRating] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [like, setLike] = useState(totalLikes);

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };
    return (
        <Card sx={{ mb: "30px" }}>
            <Grid container sx={{ padding: "25px 25px 0", marginBottom: "30px" }} spacing={3}>
                <Grid item xs={12} md={3} sm={12}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "center", sm: "flex-start" },
                        }}>
                        <Avatar
                            sx={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: userInfo.sx.bgcolor,
                                // mr: { xs: "0", md: "20px" },
                                mb: { xs: "10px" },
                            }}>
                            {userInfo.children}
                        </Avatar>
                    </Box>

                    <Typography
                        sx={{
                            mb: "10px",
                            fontWeight: 500,
                        }}>
                        {userName}
                    </Typography>
                    <Typography>
                        "ЖИЗНЬ И УДИВИТЕЛЬНЫЕ ПРИКЛЮЧЕНИЯ РОБИНЗОНА КРУЗО моряка из Йорка,
                        прожившего двадцать восемь лет в полном одиночестве на необитаемом острове у
                        берегов Америки близ устьев реки Ориноко, куда он был выброшен
                        кораблекрушением, во время которого весь экипаж корабля кроме него погиб; с
                        изложением его неожиданного освобождения пиратами, написанные им самим"
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: { xs: "column", sm: "row" },
                        }}>
                        <Typography sx={{ mx: "15px", fontStyle: "oblique" }}>
                            <FormattedMessage id="overallRating" />
                        </Typography>
                        <Rating readOnly name="totalRating" precision={0.1} value={totalRating} />
                        <Box
                            ml={1}
                            sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                            }}>{`${totalRating} / 5.0`}</Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9} sm={12}>
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
                            }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: { xs: "column", sm: "row" },
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
                        </Box>
                        <Typography sx={{ fontStyle: "italic", opacity: "0.8" }}>
                            <FormattedMessage id="published" />: data publish
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: "10px",
                        }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography sx={{ mr: "10px", fontStyle: "oblique" }}>
                                <FormattedMessage id="authorAssessment" />
                            </Typography>
                            <Rating name="authorAssessment" readOnly value={7} max={10} />
                            <Box ml={1} sx={{ fontSize: "14px" }}>{`7.0 / 10.0`}</Box>
                        </Box>

                        <Typography sx={{ fontStyle: "oblique", opacity: "0.8" }}>
                            <FormattedMessage id="category" />:{" "}
                            <Link to="/books">
                                <FormattedMessage id="books" />
                            </Link>
                        </Typography>
                    </Box>

                    <CardContent sx={{ px: "0" }}>
                        <Typography noWrap mb="10px" sx={{ fontWeight: 500, fontSize: "1.25rem" }}>
                            Title Review
                        </Typography>
                        <Typography sx={{ textAlign: "justify" }}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
                            blanditiis, error aut libero vel quidem temporibus architecto ipsum
                            quisquam modi natus doloribus et eos sequi alias cupiditate quasi eum.
                            Aspernatur?Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Totam odio voluptatibus quo culpa sunt vitae, deleniti molestiae debitis
                            hic ducimus, distinctio iusto, reiciendis dolorem corrupti eos tenetur
                            cumque sed quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Praesentium nobis ipsum repudiandae saepe, dolores et consequuntur
                            repellendus a explicabo velit alias delectus voluptates ex impedit,
                            minima mollitia eius nostrum doloribus? Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Pariatur asperiores explicabo sequi ipsa
                            similique vel impedit ut obcaecati quibusdam. Corrupti labore nisi
                            possimus distinctio expedita, dolor nihil fugit mollitia et. Lorem ipsum
                            dolor sit amet, consectetur adipisicing elit. Cum blanditiis, error aut
                            libero vel quidem temporibus architecto ipsum quisquam modi natus
                            doloribus et eos sequi alias cupiditate quasi eum. Aspernatur?Lorem
                            ipsum dolor sit amet, consectetur adipisicing elit. Totam odio
                            voluptatibus quo culpa sunt vitae, deleniti molestiae debitis hic
                            ducimus, distinctio iusto, reiciendis dolorem corrupti eos tenetur
                            cumque sed quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Praesentium nobis ipsum repudiandae saepe, dolores et consequuntur
                            repellendus a explicabo velit alias delectus voluptates ex impedit,
                            minima mollitia eius nostrum doloribus? Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Pariatur asperiores explicabo sequi ipsa
                            similique vel impedit ut obcaecati quibusdam. Corrupti labore nisi
                            possimus distinctio expedita, dolor nihil fugit mollitia et.
                        </Typography>
                    </CardContent>
                    <CardActions
                        sx={{
                            //justifyContent: "space-between",
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
                        <Box sx={{ display: "flex", alignSelf: "flex-end", alignItems: "center" }}>
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
                                sx={{ color: isLiked && "#3578fa", fontWeight: 500, mt: "7px" }}>
                                {like}
                            </Typography>
                        </Box>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    );
}
