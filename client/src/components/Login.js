import React from "react";
import { Box, Container, Paper, Typography, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { FormattedMessage } from "react-intl";

const Login = () => {
    return (
        <Container
            maxWidth="lg"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
            }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Paper
                    elevation={8}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        p: "20px",
                    }}>
                    <Typography variant="h6" sx={{ pb: "20px" }}>
                        <FormattedMessage id="loginPage" />
                    </Typography>
                    <Button
                        fullWidth
                        endIcon={<FacebookIcon />}
                        sx={{ mb: "10px", justifyContent: "space-between" }}
                        variant="outlined">
                        <FormattedMessage id="signInWith" /> Facebook
                    </Button>
                    <Button
                        fullWidth
                        endIcon={<TwitterIcon />}
                        sx={{ mb: "10px", justifyContent: "space-between" }}
                        variant="outlined">
                        <FormattedMessage id="signInWith" /> Twitter
                    </Button>
                    <Button
                        fullWidth
                        endIcon={<GitHubIcon />}
                        sx={{ justifyContent: "space-between" }}
                        variant="outlined">
                        <FormattedMessage id="signInWith" /> GitHub
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
