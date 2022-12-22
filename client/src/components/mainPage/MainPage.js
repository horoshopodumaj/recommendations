import React from "react";
import style from "./MainPage.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
    Box,
    Button,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Typography,
} from "@mui/material";
import Header from "../header/Header";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

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
            <section style={{ height: "1000px" }}>
                <Container sx={{ py: "60px" }}>
                    <Box>
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
                    </Box>
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
            <section style={{ height: "500px" }}>
                <Container>
                    <Grid
                        container
                        sx={{ display: { xs: "none", sm: "flex" } }}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={3} sx={{ border: "1px solid black" }}>
                            <List>
                                <ListItem
                                    sx={{
                                        fontSize: {
                                            xs: "1rem",
                                            md: "1.125rem",
                                        },
                                        fontWeight: 500,
                                    }}>
                                    <FormattedMessage id="quickLinks" />
                                </ListItem>
                                <Link to="/login">
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <FormattedMessage id="aboutUs" />
                                            }></ListItemText>
                                    </ListItem>
                                </Link>
                                <Link to="/profile">
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <FormattedMessage id="my_account" />
                                            }></ListItemText>
                                    </ListItem>
                                </Link>
                            </List>
                        </Grid>
                        <Grid item xs={3} sx={{ border: "1px solid black" }}>
                            <List>
                                <ListItem
                                    sx={{
                                        fontSize: {
                                            xs: "1rem",
                                            md: "1.125rem",
                                        },
                                        fontWeight: 500,
                                    }}>
                                    <FormattedMessage id="categories" />
                                </ListItem>
                                <Link to="/films">
                                    <ListItem sx={{ textTransform: "capitalize" }}>
                                        <ListItemText
                                            primary={
                                                <FormattedMessage id="films" />
                                            }></ListItemText>
                                    </ListItem>
                                </Link>
                                <Link to="/books">
                                    <ListItem sx={{ textTransform: "capitalize", color: "black" }}>
                                        <ListItemText
                                            primary={
                                                <FormattedMessage id="books" />
                                            }></ListItemText>
                                    </ListItem>
                                </Link>
                                <Link to="/games">
                                    <ListItem sx={{ textTransform: "capitalize" }}>
                                        <ListItemText
                                            primary={
                                                <FormattedMessage id="games" />
                                            }></ListItemText>
                                    </ListItem>
                                </Link>
                            </List>
                        </Grid>
                        <Grid item xs={3} sx={{ border: "1px solid black" }}>
                            <List>
                                <ListItem
                                    sx={{
                                        fontSize: {
                                            xs: "1rem",
                                            md: "1.125rem",
                                        },
                                        fontWeight: 500,
                                    }}>
                                    <FormattedMessage id="contacts" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`97845 Baker st. 567 Los Angeles - US`}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <PhoneIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`+61 23 8093 3400`} />
                                </ListItem>
                                <Link>
                                    <ListItem>
                                        <ListItemIcon>
                                            <EmailIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`info@domain.com`} />
                                    </ListItem>
                                </Link>
                            </List>
                        </Grid>
                        <Grid item xs={3} sx={{ border: "1px solid black" }}>
                            <List>
                                <ListItem
                                    sx={{
                                        fontSize: {
                                            xs: "1rem",
                                            md: "1.125rem",
                                        },
                                        fontWeight: 500,
                                    }}>
                                    <FormattedMessage id="followUs" />
                                </ListItem>
                                <div className={style.socialNetwork}>
                                    <Link to="/">
                                        <ListItem>
                                            <ListItemIcon>
                                                <FacebookIcon />
                                            </ListItemIcon>
                                        </ListItem>
                                    </Link>
                                    <Link to="/">
                                        <ListItem>
                                            <ListItemIcon>
                                                <TwitterIcon />
                                            </ListItemIcon>
                                        </ListItem>
                                    </Link>
                                    <Link to="/">
                                        <ListItem>
                                            <ListItemIcon>
                                                <InstagramIcon />
                                            </ListItemIcon>
                                        </ListItem>
                                    </Link>
                                </div>
                            </List>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </>
    );
}
