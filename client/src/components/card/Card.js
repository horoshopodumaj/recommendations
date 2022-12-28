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

export default function CardReview({ boxShadow }) {
    return (
        <Card
            sx={{
                "&.MuiPaper-root": {
                    boxShadow: boxShadow,
                },
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
            <CardContent>
                <Typography mb="5px">
                    User Name <FormattedMessage id="reviewed" /> Work Name
                </Typography>
                <Typography noWrap mb="10px" sx={{ fontWeight: 500, fontSize: "1.25rem" }}>
                    Title Review
                </Typography>
                <Typography mb="15px">
                    Description Review Lorem, ipsum dolor sit amet consectetur adipisicing elit....
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
                <Typography>data publish</Typography>
                <Link to="/review/:id">
                    <Button>
                        <FormattedMessage id="readReview" />
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
