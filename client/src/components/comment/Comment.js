import { Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import UserAvatar from "../avatar/UserAvatar";

export default function Comment({ comment, name }) {
    return (
        <Grid container spacing={2} sx={{ paddingTop: "20px" }}>
            <Grid
                item
                xs={0}
                md={3}
                sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}>
                <Link to={`/profile/${comment.userId}`}>
                    <UserAvatar width={"40px"} height={"40px"} name={name} />
                </Link>
            </Grid>
            <Grid item xs={12} md={9}>
                <Link to={`/profile/${comment.userId}`} style={{ color: "black" }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 400,
                            fontSize: "18px",
                            paddingBottom: "5px",
                        }}>
                        {name}
                    </Typography>
                </Link>
                <Typography>{comment.description}</Typography>
                <Typography sx={{ fontSize: "14px", opacity: 0.5 }}>{comment.date}</Typography>
            </Grid>
        </Grid>
    );
}
