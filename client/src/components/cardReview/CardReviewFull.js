import React, { useState } from "react";
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

export default function CardReviewFull() {
    const [rating, setRating] = useState(0);
    const [like, setLike] = useState(false);
    return (
        <Card sx={{ mb: "30px" }}>
            <Grid container sx={{ padding: "25px 25px 0", marginBottom: "30px" }} spacing={3}>
                <Grid item xs={12} md={3} sm={12}>
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
                    <Typography sx={{ mb: "10px" }}>{userName}</Typography>
                    <Typography>
                        <FormattedMessage id="review" />: "ЖИЗНЬ И УДИВИТЕЛЬНЫЕ ПРИКЛЮЧЕНИЯ
                        РОБИНЗОНА КРУЗО моряка из Йорка, прожившего двадцать восемь лет в полном
                        одиночестве на необитаемом острове у берегов Америки близ устьев реки
                        Ориноко, куда он был выброшен кораблекрушением, во время которого весь
                        экипаж корабля кроме него погиб; с изложением его неожиданного освобождения
                        пиратами, написанные им самим"
                    </Typography>
                </Grid>
                <Grid item xs={12} md={9} sm={12}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: "10px",
                        }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography sx={{ mr: "10px" }}>
                                <FormattedMessage id="yourRating" />
                            </Typography>
                            <Rating
                                name="yourRating"
                                onChange={(event, newValue) => setRating(newValue)}
                                value={rating}
                            />
                            <Typography sx={{ mx: "15px" }}>
                                <FormattedMessage id="overallRating" />
                            </Typography>
                            <Rating
                                readOnly
                                name="totalRating"
                                precision={0.1}
                                value={totalRating}
                            />
                            <Box ml={1} sx={{ fontSize: "14px" }}>{`${totalRating} / 5.0`}</Box>
                        </Box>
                        <Typography>
                            <FormattedMessage id="published" />: data publish
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ mr: "10px" }}>
                            <FormattedMessage id="authorAssessment" />
                        </Typography>
                        <Rating name="authorAssessment" readOnly value={7} max={10} />
                        <Box ml={1} sx={{ fontSize: "14px" }}>{`7.0 / 10.0`}</Box>
                    </Box>

                    <CardContent sx={{ pl: "0" }}>
                        <Typography noWrap mb="10px" sx={{ fontWeight: 500, fontSize: "1.25rem" }}>
                            Title Review
                        </Typography>
                        <Typography mb="30px" sx={{ textAlign: "justify" }}>
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
                    <CardActions sx={{ float: "right" }}>
                        <Typography sx={{ mr: "10px", mt: "5px" }}>
                            <FormattedMessage id="rateReview" />
                        </Typography>
                        <IconButton
                            sx={{ padding: 0, color: like && "#3578fa" }}
                            onClick={() => setLike(!like)}>
                            <ThumbUpIcon sx={{ fontSize: "24px" }} />
                        </IconButton>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    );
}
