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
import WriteReview from "../../components/writeReview/WriteReview";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/slices/currentUserSlice";
import { getGroupPosts, selectPosts, selectPostsCount } from "../../store/slices/groupPostsSlice";

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {},
});

const ContentPage = ({ category }) => {
    const currentUser = useSelector(selectCurrentUser);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [countUserLikes, setCountUserLikes] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;

    const posts = useSelector(selectPosts);
    const postsCount = useSelector(selectPostsCount);

    const dispatch = useDispatch();

    const getGroupPostsTest = async () => {
        dispatch(getGroupPosts({ id: category.id, limit, page: currentPage }));
    };

    const pageCount = Math.ceil(postsCount / limit);

    const pageHandler = (event, value) => {
        setCurrentPage(value);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        getGroupPostsTest();
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
        getGroupPostsTest();
    }, [currentPage, category.id]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setCurrentPage(1);
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
        </>
    );
};

export default ContentPage;
