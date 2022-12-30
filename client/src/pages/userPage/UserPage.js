import React, { useCallback, useContext, useEffect, useState } from "react";
import style from "./User.module.scss";
import Header from "../../components/header";
import { Box, Button, Container, Grid, List, ListItem, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { styled } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";
import { grey } from "@mui/material/colors";
import Footer from "../../components/footer";
import CardReviewFull from "../../components/cardReview";
import WriteReview from "../../components/writeReview/WriteReview";
import UserAvatar from "../../components/avatar/UserAvatar";
import GlobalContext from "../../contexts/GlobalContext";
import axios from "axios";
import { URL } from "../../App";

//const userName = "VeryLongNameJed VeryLongSurnameDodds";

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {},
});

export default function UserPage() {
    const { user } = useContext(GlobalContext);
    const [posts, setPosts] = useState([]);

    const getProfile = useCallback(async () => {
        try {
            await axios
                .get(`${URL}/api/review/user/${user.id}`)
                .then((response) => setPosts(response.data));
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    const isUser = true;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Header position={"fixed"} isScrolled={true} boxShadow={"none"} />
            <section className="user_summary">
                <div className="wrapper">
                    <Container>
                        <Grid container>
                            <Grid item xs={12} md={6} sm={12}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", md: "row" },
                                        alignItems: "center",
                                        mr: { xs: "0", md: "20px" },
                                        mb: { xs: "20px", md: "0" },
                                        fontSize: "2rem",
                                    }}>
                                    <Box
                                        sx={{
                                            mr: { xs: "0", md: "20px" },
                                            mb: { xs: "20px", md: "0" },
                                        }}>
                                        <UserAvatar
                                            width={"120px"}
                                            height={"120px"}
                                            name={user.name}
                                            fontSize={"2rem"}
                                        />
                                    </Box>
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
                                        {user.name}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6} sm={12}>
                                <List
                                    sx={{ display: "flex", float: { xs: "center", md: "right" } }}>
                                    <ListItem
                                        sx={{ flexDirection: "column", alignItems: "center" }}>
                                        <strong className="strong">12</strong>
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
                                                    <FormattedMessage id="reviews" />
                                                </Typography>
                                            </Box>
                                        </CustomWidthTooltip>
                                    </ListItem>
                                    <ListItem
                                        sx={{ flexDirection: "column", alignItems: "center" }}>
                                        <strong className="strong">45</strong>
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
                        {isUser && (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    justifyContent: "flex-end",
                                }}>
                                <Button sx={{ color: "white" }} onClick={handleOpen}>
                                    <FormattedMessage id="writeReview" />
                                </Button>
                                <Button sx={{ color: "white" }}>
                                    <FormattedMessage id="edit" />
                                </Button>
                            </Box>
                        )}
                    </Container>
                </div>
                <WriteReview onClose={handleClose} open={open} />
            </section>
            <section
                style={{
                    backgroundColor: grey[200],
                    paddingTop: "60px",
                    paddingBottom: "35px",
                }}>
                <Container>
                    {posts.map((post) => (
                        <CardReviewFull post={post} />
                    ))}

                    {/* <CardReviewFull /> */}
                </Container>
            </section>
            <Footer />
        </>
    );
}
