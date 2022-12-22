import React from "react";
import style from "./MainPage.module.scss";

import { Box, Button, Container, Grid, IconButton, Typography } from "@mui/material";
import Header from "../header/Header";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const tags = [
    "film",
    "book",
    "2022",
    "2021",
    "Avatar",
    "Аватар",
    "Бакман",
    "jrgrijigrkjdgijopokklk;ll'l'l'lsmd;;k;kkjjlklkjljkk;k;;k",
    "очень длинный тэг",
];

export default function MainPage() {
    return (
        <>
            <Header position={"fixed"} backgroundColor={"transparent"} boxShadow={"none"} />
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
                <Container></Container>
            </section>
            <section style={{ height: "1000px" }}>
                <Container sx={{ py: "60px" }}>
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
                                }}>
                                <FormattedMessage id="latestReviewsDesc" />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={3} sm={4} sx={{ order: { xs: 1, md: 2, sm: 2 } }}>
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
                                }}>
                                <FormattedMessage id="tags" />
                            </Typography>
                            <Box sx={{ overflow: "hidden" }}>
                                {tags.map((tag) => (
                                    <Link style={{ textOverflow: "clip" }}>
                                        <Button sx={{ minWidth: "fit-content" }} variant="text">
                                            <Typography sx={{ fontSize: "0.9rem" }} noWrap>
                                                {tag}
                                            </Typography>
                                        </Button>
                                    </Link>
                                ))}
                            </Box>
                            <Link to="/tags" style={{ float: "right" }}>
                                <div className={style.link}>
                                    <Typography sx={{ fontSize: "0.9rem" }} pr={"5px"}>
                                        <FormattedMessage id="viewAll" />
                                    </Typography>
                                    <KeyboardArrowRightIcon />
                                </div>
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
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
