import React from "react";
import style from "./MainPage.module.scss";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Header from "../../components/header";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { grey } from "@mui/material/colors";
import Card from "../../components/card";
import Carousel from "../../components/carousel";

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
            <Header
                position={"fixed"}
                backgroundColor={"transparent"}
                boxShadow={"none"}
                isScrolled={false}
            />
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
                                <Grid item xs={12} md={6}>
                                    <Card />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card />
                                </Grid>
                            </Grid>
                            <Link to="/reviews" style={{ float: "right", marginTop: "10px" }}>
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
                            <Box sx={{ overflow: "hidden" }}>
                                {tags.map((tag) => (
                                    <Link
                                        className={style.tagslink}
                                        style={{ maxWidth: "80px", backgroundColor: grey[100] }}>
                                        <Typography sx={{ fontSize: "0.9rem" }} noWrap>
                                            {tag}
                                        </Typography>
                                    </Link>
                                ))}
                            </Box>
                            <Link to="/tags" style={{ float: "right", marginTop: "10px" }}>
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
                            <FormattedMessage id="latestReviewsDesc" />
                        </Typography>
                        <Carousel />
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
