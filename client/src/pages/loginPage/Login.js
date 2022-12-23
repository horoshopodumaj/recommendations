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
                            variant="outlined">
                            <FormattedMessage id="signInWith" /> {item.socialMedia}
                        </Button>
                    ))}
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
