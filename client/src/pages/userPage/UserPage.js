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
    Typography,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { styled } from "@mui/material/styles";
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

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {},
});

export default function UserPage() {
    return (
        <>
            <Header position={"fixed"} isScrolled={true} boxShadow={"none"} />
            <section className={style.user_summary}>
                <div className={style.wrapper}>
                    <Container>
                        <Grid container>
                            <Grid item xs={12} md={6} sm={12}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", md: "row" },
                                        alignItems: "center",
                                    }}>
                                    <Avatar
                                        sx={{
                                            width: "120px",
                                            height: "120px",
                                            backgroundColor: userInfo.sx.bgcolor,
                                            mr: { xs: "0", md: "20px" },
                                            mb: { xs: "20px", md: "0" },
                                        }}>
                                        {userInfo.children}
                                    </Avatar>
                                    <Typography
                                        component="h3"
                                        sx={{
                                            fontSize: {
                                                xs: "1.5rem",
                                                sm: "2rem",
                                            },
                                            textAlign: "center",
                                            color: "white",
                                        }}>
                                        {userName}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6} sm={12}>
                                <List
                                    sx={{ display: "flex", float: { xs: "center", md: "right" } }}>
                                    <ListItem
                                        sx={{ flexDirection: "column", alignItems: "center" }}>
                                        <strong className={style.strong}>12</strong>
                                        <CustomWidthTooltip
                                            sx={{
                                                maxWidth: { xs: "200px", md: "500px" },
                                                textAlign: "center",
                                            }}
                                            title={<FormattedMessage id="countReviews" />}
                                            placement="top">
                                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                <StarIcon sx={{ color: "white", mr: "5px" }} />
                                                <Typography sx={{ color: "white", mt: "3px" }}>
                                                    <FormattedMessage id="review" />
                                                </Typography>
                                            </Box>
                                        </CustomWidthTooltip>
                                    </ListItem>
                                    <ListItem
                                        sx={{ flexDirection: "column", alignItems: "center" }}>
                                        <strong className={style.strong}>54</strong>
                                        <CustomWidthTooltip
                                            sx={{
                                                maxWidth: { xs: "200px", md: "500px" },
                                                textAlign: "center",
                                            }}
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
                                                    <FormattedMessage id="like" />
                                                </Typography>
                                            </Box>
                                        </CustomWidthTooltip>
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
