import React from "react";
import { Link } from "react-router-dom";
import style from "./Footer.module.scss";
import { FormattedMessage } from "react-intl";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import CopyrightIcon from "@mui/icons-material/Copyright";
import {
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

export default function Footer() {
    return (
        <footer className={style.footer}>
            <Container>
                <Grid
                    className={style.gridContainer}
                    container
                    sx={{ display: { xs: "none", sm: "flex" } }}
                    columnSpacing={{ sm: 2, md: 3 }}>
                    <Grid item md={3} sm={6}>
                        <List>
                            <ListItem
                                sx={{
                                    fontSize: {
                                        xs: "1rem",
                                        md: "1.3rem",
                                    },
                                    fontWeight: 500,
                                    pb: "1rem",
                                }}>
                                <FormattedMessage id="quickLinks" />
                            </ListItem>
                            <Link to="/login">
                                <ListItem>
                                    <ListItemText primary={<FormattedMessage id="aboutUs" />} />
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
                    <Grid item md={3} sm={6}>
                        <List>
                            <ListItem
                                sx={{
                                    fontSize: {
                                        xs: "1rem",
                                        md: "1.3rem",
                                    },
                                    fontWeight: 500,
                                    pb: "1rem",
                                }}>
                                <FormattedMessage id="categories" />
                            </ListItem>
                            <Link to="/films">
                                <ListItem sx={{ textTransform: "capitalize" }}>
                                    <ListItemText
                                        primary={<FormattedMessage id="films" />}></ListItemText>
                                </ListItem>
                            </Link>
                            <Link to="/books">
                                <ListItem sx={{ textTransform: "capitalize", color: "black" }}>
                                    <ListItemText
                                        primary={<FormattedMessage id="books" />}></ListItemText>
                                </ListItem>
                            </Link>
                            <Link to="/games">
                                <ListItem sx={{ textTransform: "capitalize" }}>
                                    <ListItemText
                                        primary={<FormattedMessage id="games" />}></ListItemText>
                                </ListItem>
                            </Link>
                        </List>
                    </Grid>
                    <Grid item md={3} sm={6}>
                        <List>
                            <ListItem
                                sx={{
                                    fontSize: {
                                        xs: "1rem",
                                        md: "1.3rem",
                                    },
                                    fontWeight: 500,
                                    pb: "1rem",
                                }}>
                                <FormattedMessage id="contacts" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={`97845 Baker st. 567 Los Angeles - US`} />
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
                    <Grid item md={3} sm={6}>
                        <List>
                            <ListItem
                                sx={{
                                    fontSize: {
                                        xs: "1rem",
                                        md: "1.3rem",
                                    },
                                    fontWeight: 500,
                                    pb: "1rem",
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
                <Divider sx={{ my: "20px" }} />
                <List className={style.footer_politics}>
                    <Link to="/">
                        <ListItem sx={{ width: "fit-content" }}>
                            <ListItemText primary={<FormattedMessage id="terms" />} />
                        </ListItem>
                    </Link>
                    <Divider orientation="vertical" flexItem />
                    <Link to="/">
                        <ListItem sx={{ width: "fit-content" }}>
                            <ListItemText primary={<FormattedMessage id="privacy" />} />
                        </ListItem>
                    </Link>
                    <Divider orientation="vertical" flexItem />
                    <ListItem sx={{ width: "fit-content" }}>
                        <CopyrightIcon />
                        <ListItemText primary={`2022`} />
                    </ListItem>
                </List>
            </Container>
        </footer>
    );
}
