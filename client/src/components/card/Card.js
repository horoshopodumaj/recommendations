import {
    Badge,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Rating,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { URL } from "../../App";
import UserAvatar from "../avatar/UserAvatar";

export default function CardReview({ boxShadow, review }) {
    const date = Date.parse(review.createdAt);
    const desc = review.description.slice(0, 120);
    const [countUserLikes, setCountUserLikes] = useState(0);
    const [totalRating, setTotalRating] = useState(0);
    // console.log(review);
    const totalRatingPost = useCallback(() => {
        const totalRating =
            review.stars.length > 0
                ? review.stars.reduce((acc, star) => acc + star.value, 0) / review.stars.length
                : 0;
        setTotalRating(totalRating);
    }, [review.stars]);

    useEffect(() => {
        totalRatingPost();
    }, [totalRatingPost, review.userId]);

    const getUserLikes = useCallback(async (userId) => {
        try {
            await axios
                .get(`${URL}/api/user/likes/${userId}`)
                .then((response) => setCountUserLikes(response.data.count));
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getUserLikes(review.userId);
    }, []);

    return (
        <Card
            sx={{
                "&.MuiPaper-root": {
                    boxShadow: boxShadow,
                },
                display: "flex",
                flexDirection: "column",
                width: "100%",
            }}>
            <CardHeader
                avatar={
                    <Badge
                        overlap="circular"
                        badgeContent={countUserLikes}
                        color="secondary"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}>
                        <Link to={`/profile/${review.userId}`}>
                            <UserAvatar width={"40px"} height={"40px"} name={review.user.name} />
                        </Link>
                    </Badge>
                }
                title={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Rating readOnly precision={0.1} name="totalRating" value={totalRating} />{" "}
                        <Box ml={2}>{`${totalRating.toFixed(1)} / 5.0`}</Box>{" "}
                    </Box>
                }
                subheader={review.group.name.toUpperCase()}
            />
            <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <Box sx={{ marginBottom: "10px" }}>
                    <Link to={`profile/${review.userId}`}>
                        <Typography
                            component="span"
                            sx={{ fontWeight: 500, color: "black", marginRight: "8px" }}>
                            {review.user.name}
                        </Typography>
                    </Link>
                    <Typography component="span">
                        <FormattedMessage id="reviewed" />
                    </Typography>
                </Box>
                <Typography mb="5px" component="span">
                    {review.workName}
                </Typography>
                <Typography noWrap mb="10px" sx={{ fontWeight: 500, fontSize: "1.25rem" }}>
                    {review.title}
                </Typography>
                <Typography mb="15px">{`${desc} ...`}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
                <Typography>{new Date(date).toLocaleDateString("ru-RU")}</Typography>
                <Link to={`/review/${review.id}`}>
                    <Button>
                        <FormattedMessage id="readReview" />
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
