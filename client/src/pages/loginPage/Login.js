import React from "react";
import { Link } from "react-router-dom";
import style from "./Login.module.scss";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { FormattedMessage } from "react-intl";
import LocalePicker from "../../components/header/LocalePicker";
import { URL } from "../../App";

const buttonsOptions = [
    {
        socialMedia: "Google",
        bg: "#dc4e41",
        icon: <GoogleIcon sx={{ marginTop: "-3.6px", color: "white" }} />,
    },
    {
        socialMedia: "Facebook",
        bg: "#385898",
        icon: <FacebookIcon sx={{ marginTop: "-3.6px", color: "white" }} />,
    },
    {
        socialMedia: "Twitter",
        bg: "#1D9BF0",
        icon: <TwitterIcon sx={{ marginTop: "-3.6px", color: "white" }} />,
    },
    {
        socialMedia: "GitHub",
        bg: "#24292f",
        icon: <GitHubIcon sx={{ marginTop: "-3.6px", color: "white" }} />,
    },
];

const Login = () => {
    const auth = (socialMedia) => {
        if (socialMedia === "Google") {
            window.open(`${URL}/api/user/login/google`, "_self");
        }
        if (socialMedia === "GitHub") {
            window.open(`${URL}/api/user/login/github`, "_self");
        }
        if (socialMedia === "Facebook") {
            window.open(`${URL}/api/user/login/facebook`, "_self");
        }
        if (socialMedia === "Twitter") {
            window.open(`${URL}/api/user/login/twitter`, "_self");
        }
    };
    return (
        <section className={style.container}>
            <Box
                className={style.wpapper}
                sx={{
                    boxShadow: "3px 0 30px rgb(0 0 0 / 20%)",
                    padding: "45px",
                    boxSizing: "border-box",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    minHeight: "100vh",
                }}>
                <figure className={style.logoContainer}>
                    <Link to="/" className={style.logo}>
                        LOGO
                    </Link>
                </figure>
                <div style={{ float: "right" }}>
                    <LocalePicker />
                </div>
                <form style={{ marginTop: "60px" }}>
                    {buttonsOptions.map((item) => (
                        <Button
                            fullWidth
                            key={item.socialMedia}
                            endIcon={item.icon}
                            sx={{
                                mb: "10px",
                                justifyContent: "center",
                                color: "white",
                                backgroundColor: item.bg,
                                borderColor: item.bg,
                                "&.MuiButtonBase-root:hover": {
                                    color: "white",
                                    backgroundColor: item.bg,
                                    borderColor: item.bg,
                                    filter: "brightness(125%)",
                                },
                            }}
                            variant="outlined"
                            onClick={() => auth(item.socialMedia)}>
                            <FormattedMessage id="signInWith" /> {item.socialMedia}
                        </Button>
                    ))}
                </form>
                <Divider sx={{ color: "black", fontFamily: "Roboto", textTransform: "uppercase" }}>
                    <FormattedMessage id="or" />
                </Divider>
                <form>
                    <Box>
                        {/* <label htmlFor="name">
                            <Typography
                                sx={{
                                    mt: "10px",
                                    color: "rgba(0, 0, 0, 0.6)",
                                    fontSize: "0.9rem",
                                }}>
                                <FormattedMessage id="name" />
                            </Typography>
                        </label> */}
                        <TextField
                            id="name"
                            sx={{ width: "100%" }}
                            required
                            size="small"
                            label={<FormattedMessage id="name" />}></TextField>
                        <Typography
                            sx={{
                                fontSize: "0.75rem",
                                lineHeight: "1.66",
                                letterSpacing: "0.03333em",
                                color: "rgba(0, 0, 0, 0.6)",
                            }}>
                            <FormattedMessage id="nameHelp" />
                        </Typography>
                    </Box>
                    <Box>
                        <TextField
                            id="lastName"
                            sx={{ width: "100%" }}
                            required
                            label={<FormattedMessage id="lastName" />}></TextField>
                        <Typography
                            sx={{
                                fontSize: "0.75rem",
                                lineHeight: "1.66",
                                letterSpacing: "0.03333em",
                                color: "rgba(0, 0, 0, 0.6)",
                            }}>
                            <FormattedMessage id="lastNameHelp" />
                        </Typography>
                    </Box>
                    <Box>
                        <TextField
                            id="email"
                            sx={{ width: "100%" }}
                            required
                            label="Email"></TextField>
                        <Typography
                            sx={{
                                fontSize: "0.75rem",
                                lineHeight: "1.66",
                                letterSpacing: "0.03333em",
                                color: "rgba(0, 0, 0, 0.6)",
                            }}>
                            <FormattedMessage id="emailHelp" />
                        </Typography>
                        <TextField
                            id="password"
                            sx={{ width: "100%" }}
                            required
                            label={<FormattedMessage id="password" />}></TextField>
                        <Typography
                            sx={{
                                fontSize: "0.75rem",
                                lineHeight: "1.66",
                                letterSpacing: "0.03333em",
                                color: "rgba(0, 0, 0, 0.6)",
                            }}>
                            <FormattedMessage id="passwordHelp" />
                        </Typography>
                    </Box>
                    <Button variant="contained" sx={{ width: "100%" }} type="submit">
                        <FormattedMessage id="register" />
                    </Button>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography sx={{ color: "black", display: "inline" }}>
                            <FormattedMessage id="signInDesc" />
                        </Typography>
                        <Button sx={{ color: "primary.main" }}>
                            <FormattedMessage id="signIn" />
                        </Button>
                    </Box>
                </form>
                <div className={style.copyContainer}>
                    <div className={style.copy}>
                        <CopyrightIcon sx={{ pr: "5px" }} />
                        2022
                    </div>
                </div>
            </Box>
        </section>
    );
};

export default Login;
