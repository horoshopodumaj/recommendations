import React, { useEffect, useRef } from "react";
import style from "./MainPage.module.scss";
import { useScrollbar } from "../../hooks/useScrollbar";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Header from "../../components/header";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { grey } from "@mui/material/colors";
import Card from "../../components/card";
import Carousel from "../../components/carousel";
import { useSelector } from "react-redux";
import { selectTags } from "../../store/slices/tagsSlice";
import {
    selectBiggestRateReviews,
    selectLatestReviews,
    selectStatusBiggestReviews,
    selectStatusLatestReviews,
} from "../../store/slices/reviewsSlice";
import Skeleton from "./Skeleton";

export default function MainPage() {
    const tags = useSelector(selectTags);
    const latestReviews = useSelector(selectLatestReviews);
    const biggestRateReviews = useSelector(selectBiggestRateReviews);
    const statusLatest = useSelector(selectStatusLatestReviews);
    const statusBiggest = useSelector(selectStatusBiggestReviews);
    const tagsBox = useRef(null);
    const hasScroll = tags.length > 5;

    useScrollbar(tagsBox, hasScroll);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header backgroundColor={"transparent"} color={true} />
            <section className={style.banner}>
                <div className={style.wrapper}>
                    <Container>
                        <Typography
                            component="h3"
                            sx={{
                                fontSize: {
                                    xs: "1.625rem",
                                    sm: "2.7rem",
                                    md: "3.25rem",
                                },
                                textAlign: "center",
                            }}>
                            <FormattedMessage id="title" />
                        </Typography>
                        <Typography
                            component="p"
                            sx={{
                                fontSize: {
                                    xs: "1rem",
                                    md: "1.25rem",
                                },
                                textAlign: "center",
                            }}>
                            <FormattedMessage id="paragraph" />
                        </Typography>
                    </Container>
                </div>
            </section>
            <section>
                <Container sx={{ py: { xs: "30px", sm: "60px" } }}>
                    <Grid container columnSpacing={{ sm: 2, md: 3, sx: 1 }}>
                        <Grid item xs={12} md={9} sm={8} sx={{ order: { xs: 2, md: 1, sm: 1 } }}>
                            <Typography
                                component="h2"
                                sx={{
                                    fontSize: {
                                        xs: "1.5rem",
                                        md: "2rem",
                                    },
                                    fontWeight: 500,
                                    textAlign: { xs: "center", sm: "left" },
                                }}>
                                <FormattedMessage id="latestReviews" />
                            </Typography>
                            <Typography
                                component="p"
                                sx={{
                                    fontSize: {
                                        xs: "1rem",
                                        md: "1.125rem",
                                    },
                                    mb: "1rem",
                                    textAlign: { xs: "center", sm: "left" },
                                }}>
                                <FormattedMessage id="latestReviewsDesc" />
                            </Typography>
                            <Grid
                                container
                                rowSpacing={{ sm: 2, md: 3, sx: 1 }}
                                columnSpacing={{ sm: 2, md: 3, sx: 1 }}
                                sx={{ gap: { xs: ".8rem", md: "0" } }}>
                                {statusLatest === "error"
                                    ? [...new Array(4)].map((_, index) => (
                                          <Grid
                                              item
                                              key={index}
                                              xs={12}
                                              md={6}
                                              sx={{ display: "flex" }}>
                                              <div className="content__error-info">
                                                  <h2>
                                                      Произошла ошибка <icon>😕</icon>
                                                  </h2>
                                                  <p>
                                                      Приносим свои извинения, мы скоро всё починим.
                                                  </p>
                                              </div>
                                          </Grid>
                                      ))
                                    : statusLatest === "loading"
                                    ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
                                    : latestReviews.map((review) => (
                                          <Grid
                                              key={review.id}
                                              item
                                              xs={12}
                                              md={6}
                                              sx={{ display: "flex" }}>
                                              <Card review={review} />
                                          </Grid>
                                      ))}
                            </Grid>
                            <Link to="/all" style={{ float: "right", marginTop: "10px" }}>
                                <div className={style.link}>
                                    <Typography sx={{ fontSize: "0.9rem" }} pr={"5px"}>
                                        <FormattedMessage id="viewAll" />
                                    </Typography>
                                    <KeyboardArrowRightIcon />
                                </div>
                            </Link>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={3}
                            sm={4}
                            sx={{ order: { xs: 1, md: 2, sm: 2 }, mb: { sm: "0", xs: "20px" } }}>
                            <Typography
                                textAlign={"center"}
                                component="h2"
                                sx={{
                                    fontSize: {
                                        xs: "1rem",
                                        md: "1.25rem",
                                    },
                                    fontWeight: 500,
                                    textTransform: "uppercase",
                                    mt: { md: "49px", sm: "35px", xs: "15px" },
                                    mb: { xs: "10px" },
                                }}>
                                <FormattedMessage id="tags" />
                            </Typography>
                            <Box
                                sx={{
                                    height: hasScroll ? "300px" : "auto",
                                    minHeight: "300px",
                                }}
                                ref={tagsBox}>
                                {tags.map((tag) => (
                                    <Link
                                        to={`/tag/${tag.id}`}
                                        key={tag.id}
                                        className={style.tagslink}
                                        style={{ maxWidth: "200px", backgroundColor: grey[100] }}>
                                        <Typography sx={{ fontSize: "0.9rem" }} noWrap>
                                            {tag.name}
                                        </Typography>
                                    </Link>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </section>
            <section>
                <div style={{ backgroundColor: grey[200] }}>
                    <Container sx={{ py: { xs: "30px", sm: "60px" } }}>
                        <Typography
                            component="h2"
                            sx={{
                                fontSize: {
                                    xs: "1.5rem",
                                    md: "2rem",
                                },
                                fontWeight: 500,
                                textAlign: { xs: "center", sm: "left" },
                            }}>
                            <FormattedMessage id="highestReviews" />
                        </Typography>
                        <Typography
                            component="p"
                            sx={{
                                fontSize: {
                                    xs: "1rem",
                                    md: "1.125rem",
                                },
                                mb: "1rem",
                                textAlign: { xs: "center", sm: "left" },
                            }}>
                            <FormattedMessage id="highestReviewsDesc" />
                        </Typography>
                        {statusBiggest === "error" ? (
                            <div className="content__error-info">
                                <h2>
                                    Произошла ошибка <icon>😕</icon>
                                </h2>
                                <p>Приносим свои извинения, мы скоро всё починим.</p>
                            </div>
                        ) : statusBiggest === "loading" ? (
                            [...new Array(2)].map((_, index) => <Skeleton key={index} />)
                        ) : (
                            <Carousel reviews={biggestRateReviews} />
                        )}
                    </Container>
                </div>
            </section>
            <section className={style.about}>
                <div className={style.wrapperAbout}>
                    <Container>
                        <Box
                            sx={{
                                margin: "0 0 0 auto",
                                width: { xs: "100%", md: "40%", sm: "58%" },
                            }}>
                            <Typography
                                component="h3"
                                sx={{
                                    fontSize: "2.25rem",
                                    fontWeight: 300,
                                    mb: "0.5rem",
                                    color: "white",
                                }}>
                                <FormattedMessage id="LetHelpYou" />
                            </Typography>
                            <Typography
                                component="p"
                                sx={{
                                    fontSize: "1rem",
                                    mb: "30px",
                                    color: "white",
                                    textAlign: "justify",
                                }}>
                                <FormattedMessage id="LetHelpYouParagraph" />
                            </Typography>
                            <Link to="/login">
                                <Button className={style.button} variant="contained">
                                    <FormattedMessage id="joinNow" />
                                </Button>
                            </Link>
                        </Box>
                    </Container>
                </div>
            </section>
            <Footer />
        </>
    );
}
