import React from "react";
import { Link } from "react-router-dom";
import style from "./Login.module.scss";
import { Box, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { FormattedMessage } from "react-intl";
import LocalePicker from "../../components/header/LocalePicker";

const Login = () => {
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
                    <Button
                        fullWidth
                        endIcon={<GoogleIcon sx={{ marginTop: "-3.6px", color: "white" }} />}
                        sx={{
                            mb: "10px",
                            justifyContent: "center",
                            color: "white",
                            backgroundColor: "red",
                            borderColor: "red",
                        }}
                        variant="outlined">
                        <FormattedMessage id="signInWith" /> Google
                    </Button>
                    <Button
                        fullWidth
                        endIcon={<FacebookIcon sx={{ marginTop: "-3.6px", color: "white" }} />}
                        sx={{
                            mb: "10px",
                            justifyContent: "center",
                            color: "white",
                            backgroundColor: "#385898",
                            borderColor: "#385898",
                        }}
                        variant="outlined">
                        <FormattedMessage id="signInWith" /> Facebook
                    </Button>
                    <Button
                        fullWidth
                        endIcon={<TwitterIcon sx={{ marginTop: "-3.6px", color: "white" }} />}
                        sx={{
                            mb: "10px",
                            justifyContent: "center",
                            color: "white",
                            backgroundColor: "#1D9BF0",
                            borderColor: "#1D9BF0",
                        }}
                        variant="outlined">
                        <FormattedMessage id="signInWith" /> Twitter
                    </Button>
                    <Button
                        fullWidth
                        endIcon={<GitHubIcon sx={{ marginTop: "-3.6px", color: "white" }} />}
                        sx={{
                            mb: "10px",
                            justifyContent: "center",
                            color: "white",
                            backgroundColor: "black",
                            borderColor: "#black",
                        }}
                        variant="outlined">
                        <FormattedMessage id="signInWith" /> GitHub
                    </Button>
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
