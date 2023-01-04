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
import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import UserAvatar from "../avatar/UserAvatar";

const likes = 54;
const userName = "Jed Dodds";

export default function CardReview({ boxShadow, review }) {
    const date = Date.parse(review.createdAt);
    const desc = review.description.slice(0, 120);

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
                        badgeContent={likes}
                        color="secondary"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}>
                        <UserAvatar width={"40px"} height={"40px"} name={userName} />
                    </Badge>
                }
                title={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Rating readOnly name="read-only" value={3} />{" "}
                        <Box ml={2}>{`3.7 / 5.0`}</Box>{" "}
                    </Box>
                }
                subheader={`Films`}
            />
            <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <Typography mb="5px">
                    {review.userId} <FormattedMessage id="reviewed" /> {review.workName}
                </Typography>
                <Typography noWrap mb="10px" sx={{ fontWeight: 500, fontSize: "1.25rem" }}>
                    {review.title}
                </Typography>
                <Typography mb="15px">{`${desc} ...`}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
                <Typography>{new Date(date).toLocaleDateString("ru-RU")}</Typography>
                <Link to="/review/:id">
                    <Button>
                        <FormattedMessage id="readReview" />
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
