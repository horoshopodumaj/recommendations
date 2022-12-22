import {
    Avatar,
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

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

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

export default function CardReview() {
    return (
        <Card>
            <CardHeader
                avatar={<Avatar {...stringAvatar("Jed Dodds")}></Avatar>}
                title={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Rating name="read-only" value={3} /> <Box ml={2}>{`3.7 / 5.0`}</Box>{" "}
                    </Box>
                }
                subheader={`Films`}
            />
            <CardContent>
                <Typography mb="5px">
                    User Name <FormattedMessage id="reviewed" /> Work Name
                </Typography>
                <Typography mb="10px" sx={{ fontWeight: 500, fontSize: "1.25rem" }}>
                    "Title Review"
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
