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
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/slices/currentUserSlice";
import { selectCategories, selectCategoriesStatus } from "../../store/slices/groupSlice";
import SkeletonTag from "../skeletons/SkeletonTag";

export default function Footer() {
    const currentUser = useSelector(selectCurrentUser);
    const categories = useSelector(selectCategories);
    const status = useSelector(selectCategoriesStatus);
    const id = currentUser && currentUser.id;
    return (
        <footer className={style.footer}>
            <Container>
                <Grid
                    className={style.gridContainer}
                    container
                    sx={{ display: { xs: "flex", sm: "flex" } }}
                    columnSpacing={{ sm: 2, md: 3, sx: 1 }}>
                    <Grid item xs={12} md={3} sm={6}>
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
                                    <ListItemText
                                        sx={{
                                            "&:hover": {
                                                color: "#1877F2",
                                            },
                                            color: "black",
                                        }}
                                        primary={<FormattedMessage id="aboutUs" />}
                                    />
                                </ListItem>
                            </Link>
                            {currentUser ? (
                                <Link to={`/profile/${id}`}>
                                    <ListItem>
                                        <ListItemText
                                            sx={{
                                                "&:hover": {
                                                    color: "#1877F2",
                                                },
                                                color: "black",
                                            }}
                                            primary={
                                                <FormattedMessage id="my_account" />
                                            }></ListItemText>
                                    </ListItem>
                                </Link>
                            ) : (
                                <Link to={`/login`}>
                                    <ListItem>
                                        <ListItemText
                                            sx={{
                                                "&:hover": {
                                                    color: "#1877F2",
                                                },
                                                color: "black",
                                                textTransform: "capitalize",
                                            }}
                                            primary={
                                                <FormattedMessage id="login" />
                                            }></ListItemText>
                                    </ListItem>
                                </Link>
                            )}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3} sm={6}>
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
                            {status === "error" ? (
                                <div style={{ marginTop: "16px" }}>
                                    <FormattedMessage id="error" />
                                </div>
                            ) : status === "loading" ? (
                                <SkeletonTag />
                            ) : (
                                categories.map((category) => (
                                    <Link key={category.id} to={`/${category.name}`}>
                                        <ListItem
                                            sx={{
                                                "&:hover": {
                                                    color: "#1877F2",
                                                },
                                                textTransform: "capitalize",
                                                color: "black",
                                            }}>
                                            <ListItemText
                                                primary={
                                                    <FormattedMessage id={`${category.name}`} />
                                                }></ListItemText>
                                        </ListItem>
                                    </Link>
                                ))
                            )}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3} sm={6}>
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
                                        <EmailIcon
                                            sx={{
                                                "&.MuiSvgIcon-root:hover": {
                                                    color: "#1877F2",
                                                },
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        sx={{
                                            "&:hover": {
                                                color: "#1877F2",
                                            },
                                            color: "black",
                                        }}
                                        primary={`info@domain.com`}
                                    />
                                </ListItem>
                            </Link>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3} sm={6}>
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
                                            <FacebookIcon
                                                sx={{
                                                    "&.MuiSvgIcon-root:hover": {
                                                        color: "#1877F2",
                                                    },
                                                }}
                                            />
                                        </ListItemIcon>
                                    </ListItem>
                                </Link>
                                <Link to="/">
                                    <ListItem>
                                        <ListItemIcon>
                                            <TwitterIcon
                                                sx={{
                                                    "&.MuiSvgIcon-root:hover": {
                                                        color: "#1D9BF0",
                                                    },
                                                }}
                                            />
                                        </ListItemIcon>
                                    </ListItem>
                                </Link>
                                <Link to="/">
                                    <ListItem>
                                        <ListItemIcon>
                                            <InstagramIcon
                                                sx={{
                                                    "&.MuiSvgIcon-root:hover": {
                                                        color: "#FE4EDA",
                                                    },
                                                }}
                                            />
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
                        <CopyrightIcon sx={{ pr: "5px" }} />
                        <ListItemText primary={`2022`} />
                    </ListItem>
                </List>
            </Container>
        </footer>
    );
}
