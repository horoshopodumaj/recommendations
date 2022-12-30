import Header from "../../components/header";
import style from "./Content.module.scss";
import { styled } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";
import { Box, Button, Container, Grid, List, ListItem, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import StarIcon from "@mui/icons-material/Star";
import CardReviewFull from "../../components/cardReview";
import { grey } from "@mui/material/colors";
import Footer from "../../components/footer";
import WriteReview from "../../components/writeReview/WriteReview";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../App";

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {},
});

const ContentPage = ({ category }) => {
    const [open, setOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(category);

    const getPosts = useCallback(async () => {
        try {
            await axios
                .get(`${URL}/api/review/category/${category.id}`)
                .then((response) => setPosts(response.data));
        } catch (error) {
            console.log(error);
        }
    }, [category]);

    console.log(posts);

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);
    return (
        <>
            <Header />
            <section className="user_summary">
                <div className="wrapper">
                    <Container>
                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                md={6}
                                sm={12}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                <Typography
                                    component="h3"
                                    sx={{
                                        fontSize: {
                                            xs: "1.5rem",
                                            sm: "2rem",
                                        },
                                        textAlign: "center",
                                        color: "white",
                                        textTransform: "capitalize",
                                    }}>
                                    <FormattedMessage id={`${category.name}`} />
                                </Typography>
                                <Typography
                                    component="p"
                                    sx={{
                                        fontSize: {
                                            xs: "1rem",
                                            sm: "1.25rem",
                                        },
                                        textAlign: "center",
                                        color: "white",
                                        textTransform: "capitalize",
                                    }}>
                                    <FormattedMessage id="hereAreReviewsOf" />{" "}
                                    <FormattedMessage id={`${category.name}`} />
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} sm={12}>
                                <List sx={{ display: "flex", float: { xs: "center" } }}>
                                    <ListItem
                                        sx={{ flexDirection: "column", alignItems: "center" }}>
                                        <strong className="strong">{posts.length}</strong>
                                        <CustomWidthTooltip
                                            sx={{
                                                maxWidth: { xs: "200px", md: "500px" },
                                                textAlign: "center",
                                            }}
                                            title={<FormattedMessage id="countAllReviews" />}
                                            placement="top">
                                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                <StarIcon sx={{ color: "white", mr: "5px" }} />
                                                <Typography sx={{ color: "white", mt: "3px" }}>
                                                    <FormattedMessage id="reviews" />
                                                </Typography>
                                            </Box>
                                        </CustomWidthTooltip>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                        <Button sx={{ float: "right", color: "white" }} onClick={handleOpen}>
                            <FormattedMessage id="writeReview" />
                        </Button>
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
                </Container>
            </section>

            <Footer />
        </>
    );
};

export default ContentPage;
