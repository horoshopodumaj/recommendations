import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/header";
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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { styled } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";
import { grey } from "@mui/material/colors";
import CardReviewFull from "../../components/cardReview";
import WriteReview from "../../components/writeReview/WriteReview";
import UserAvatar from "../../components/avatar/UserAvatar";
import { useParams } from "react-router-dom";
import TableReviews from "../../components/table/TableReviews";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/slices/currentUserSlice";
import {
    getUserInfo,
    selectPosts,
    selectUser,
    selectUserLikes,
    selectPostsCount,
    selectStatus,
} from "../../store/slices/usersSlice";
import NoUser from "./NoUser";
import Spinner from "../../components/spiner/Spiner";

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {},
});

export default function UserPage() {
    const currentUser = useSelector(selectCurrentUser);
    const user = useSelector(selectUser);
    const posts = useSelector(selectPosts);
    const countUserLikes = useSelector(selectUserLikes);
    const postsCount = useSelector(selectPostsCount);
    const status = useSelector(selectStatus);
    const [edit, setEdit] = useState(false);
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;
    const dispatch = useDispatch();
    const pageCount = Math.ceil(postsCount / limit);

    const pageHandler = (event, value) => {
        setCurrentPage(value);
        window.scrollTo(0, 0);
    };

    const getUserInfoFunc = async () => {
        dispatch(getUserInfo({ id, limit, page: currentPage }));
    };

    useEffect(() => {
        getUserInfoFunc();
    }, []);

    // const getUserLikes = useCallback(async (userId) => {
    //     // try {
    //     //     await axios
    //     //         .get(`${URL}/api/user/likes/${userId}`)
    //     //         .then((response) => setCountUserLikes(response.data.count));
    //     // } catch (error) {
    //     //     console.log(error);
    //     // }
    //     console.log(userId);
    // }, []);

    const editOpen = () => {
        setEdit(!edit);
    };

    useEffect(() => {
        getUserInfoFunc();
    }, [currentPage, id]);

    const isUser =
        user && currentUser ? currentUser.id === user.id || currentUser.role === "ADMIN" : false;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header position={"fixed"} isScrolled={true} boxShadow={"none"} />
            {status === "error" ? (
                <div style={{ marginTop: "16px" }}>
                    <FormattedMessage id="error" />
                </div>
            ) : status === "loading" ? (
                <section className="user_summary">
                    <div className="wrapper">
                        <Spinner />
                    </div>
                </section>
            ) : user.id ? (
                <>
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
                                            sx={{
                                                display: "flex",
                                                float: { xs: "center", md: "right" },
                                            }}>
                                            <ListItem
                                                sx={{
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                }}>
                                                <strong className="strong">{postsCount}</strong>
                                                <CustomWidthTooltip
                                                    sx={{
                                                        maxWidth: { xs: "200px", md: "500px" },
                                                        textAlign: "center",
                                                    }}
                                                    title={<FormattedMessage id="countReviews" />}
                                                    placement="top">
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                        }}>
                                                        <StarIcon
                                                            sx={{ color: "white", mr: "5px" }}
                                                        />
                                                        <Typography
                                                            sx={{ color: "white", mt: "3px" }}>
                                                            <FormattedMessage id="reviews" />
                                                        </Typography>
                                                    </Box>
                                                </CustomWidthTooltip>
                                            </ListItem>
                                            <ListItem
                                                sx={{
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                }}>
                                                <strong className="strong">{countUserLikes}</strong>
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
                                                        <ThumbUpIcon
                                                            sx={{ color: "white", mr: "5px" }}
                                                        />
                                                        <Typography
                                                            sx={{ color: "white", mt: "3px" }}>
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
                                        <Button sx={{ color: "white" }} onClick={editOpen}>
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
                        {edit ? (
                            <Container>
                                <TableReviews
                                    posts={posts}
                                    getUserInfoFunc={getUserInfoFunc}
                                    editOpen={editOpen}
                                />
                            </Container>
                        ) : (
                            <Container>
                                {posts.length > 0 ? (
                                    posts.map((post) => (
                                        <CardReviewFull
                                            key={post.id}
                                            post={post}
                                            //countUserLikes={countUserLikes}
                                            //getUserLikes={getUserLikes}
                                        />
                                    ))
                                ) : isUser ? (
                                    <Box sx={{ textAlign: "center" }}>
                                        <Typography
                                            sx={{
                                                fontSize: { xs: "1.3rem", sm: "2rem" },
                                                fontWeight: 500,
                                                mb: { xs: "20px", sm: "30px" },
                                            }}>
                                            <FormattedMessage id="firstReview" />
                                        </Typography>
                                        <Button sx={{ color: "#3578fa" }} onClick={handleOpen}>
                                            <FormattedMessage id="writeReview" />
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box sx={{ textAlign: "center" }}>
                                        <Typography
                                            sx={{
                                                fontSize: { xs: "1.3rem", sm: "2rem" },
                                                fontWeight: 500,
                                                mb: { xs: "20px", sm: "30px" },
                                            }}>
                                            <FormattedMessage id="noReview" />
                                        </Typography>
                                    </Box>
                                )}
                                {postsCount > 5 && (
                                    <Pagination
                                        count={pageCount}
                                        page={currentPage}
                                        onChange={pageHandler}
                                    />
                                )}
                            </Container>
                        )}
                    </section>
                </>
            ) : (
                <NoUser />
            )}
        </>
    );
}
