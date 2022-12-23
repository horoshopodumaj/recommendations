import React from "react";
import style from "./User.module.scss";
import Header from "../../components/header";
import {
    Avatar,
    Box,
    Card,
    CardHeader,
    Container,
    Grid,
    List,
    ListItem,
    Tooltip,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
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
const userName = "Jed Dodds";
const userInfo = { ...stringAvatar(userName) };

export default function UserPage() {
    return (
        <>
            <Header position={"fixed"} isScrolled={true} boxShadow={"none"} />
            <section className={style.user_summary}>
                <div className={style.wrapper}>
                    <Container>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Avatar
                                        sx={{
                                            width: "120px",
                                            height: "120px",
                                            backgroundColor: userInfo.sx.bgcolor,
                                            mr: "20px",
                                        }}>
                                        {userInfo.children}
                                    </Avatar>
                                    <Typography
                                        component="h3"
                                        sx={{
                                            fontSize: {
                                                xs: "1.75rem",
                                                sm: "2rem",
                                            },
                                            textAlign: "center",
                                            color: "white",
                                        }}>
                                        {userName}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <List sx={{ display: "flex", float: "right" }}>
                                    <ListItem sx={{ flexDirection: "column" }}>
                                        <strong className={style.strong}>12</strong>
                                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                                            <StarIcon sx={{ color: "white", mr: "5px" }} />
                                            <Typography sx={{ color: "white", mt: "3px" }}>
                                                Review
                                            </Typography>
                                        </Box>
                                    </ListItem>
                                    <ListItem sx={{ flexDirection: "column" }}>
                                        <strong className={style.strong}>54</strong>
                                        <Tooltip
                                            sx={{ maxWidth: "20px" }}
                                            title={<FormattedMessage id="likes" />}
                                            placement="top">
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                }}>
                                                <ThumbUpIcon sx={{ color: "white", mr: "5px" }} />
                                                <Typography sx={{ color: "white", mt: "3px" }}>
                                                    Useful
                                                </Typography>
                                            </Box>
                                        </Tooltip>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </section>
        </>
    );
}
