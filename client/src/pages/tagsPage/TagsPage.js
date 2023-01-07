import React from "react";
import Header from "../../components/header";
import { styled } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";
import {
    Box,
    Button,
    Container,
    Grid,
    List,
    ListItem,
    Pagination,
    Typography,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import StarIcon from "@mui/icons-material/Star";
import CardReviewFull from "../../components/cardReview";
import { grey } from "@mui/material/colors";
import Footer from "../../components/footer";
import WriteReview from "../../components/writeReview/WriteReview";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../App";
import GlobalContext from "../../contexts/GlobalContext";
import { useParams } from "react-router-dom";

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {},
});
export default function TagsPage() {
    const { currentUser } = useContext(GlobalContext);
    const [open, setOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [countUserLikes, setCountUserLikes] = useState(0);
    const [postsCount, setPostsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [tag, setTag] = useState({});
    const limit = 5;
    const { id } = useParams();

    const pageCount = Math.ceil(postsCount / limit);

    const pageHandler = (event, value) => {
        setCurrentPage(value);
        window.scrollTo(0, 0);
    };

    const getTag = useCallback(async () => {
        try {
            await axios.get(`${URL}/api/tag/${id}`).then((response) => {
                setTag(response.data);
                setPostsCount(response.data.reviews.length);
                setPosts(response.data.reviews);
            });
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        const getTag = async () => {
            try {
                await axios.get(`${URL}/api/tag/${id}`).then((response) => {
                    setTag(response.data);
                    setPostsCount(response.data.reviews.length);
                    setPosts(response.data.reviews);
                });
            } catch (error) {
                console.log(error);
            }
        };
        getTag();
    }, []);

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
        getTag();
        window.scrollTo(0, 0);
    }, [getTag]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setCurrentPage(1);
    }, []);
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
                                md={8}
                                sm={12}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                <Typography
                                    component="p"
                                    sx={{
                                        fontSize: {
                                            xs: "1rem",
                                            sm: "1.25rem",
                                        },
                                        textAlign: "center",
                                        color: "white",
                                        textTransform: "uppercase",
                                        mb: "10px",
                                    }}>
                                    {tag && tag.name}
                                </Typography>
                                <Typography
                                    component="p"
                                    sx={{
                                        fontSize: {
                                            xs: "0.9rem",
                                            sm: "1.15rem",
                                        },
                                        textAlign: "center",
                                        color: "white",
                                    }}>
                                    <FormattedMessage id="tagReviews" />
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4} sm={12}>
                                <List sx={{ display: "flex", float: { xs: "center" } }}>
                                    <ListItem
                                        sx={{ flexDirection: "column", alignItems: "center" }}>
                                        <strong className="strong">{postsCount}</strong>
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
                        {currentUser && (
                            <Button sx={{ float: "right", color: "white" }} onClick={handleOpen}>
                                <FormattedMessage id="writeReview" />
                            </Button>
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
                        <CardReviewFull
                            key={post.id}
                            post={post}
                            countUserLikes={countUserLikes}
                            getUserLikes={getUserLikes}
                        />
                    ))}
                    {postsCount > 5 && (
                        <Pagination count={pageCount} page={currentPage} onChange={pageHandler} />
                    )}
                </Container>
            </section>

            <Footer />
        </>
    );
}
