import React from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Container,
    Paper,
    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormattedMessage } from "react-intl";

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
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
                    <Typography variant="h6" sx={{ pb: "20px", textAlign: "center" }}>
                        <FormattedMessage id="loginPage" />
                    </Typography>
                    <form>
                        <TextField
                            sx={{ mb: 2, width: "100%" }}
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                        />
                        <FormControl sx={{ mb: 2, width: "100%" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Button
                            variant="contained"
                            sx={{ width: "100%", mb: 2, py: 2 }}
                            type="submit">
                            <FormattedMessage id="signInButton" />
                        </Button>
                    </form>
                    <Divider variant="middle" sx={{ width: "100%", mb: 2 }}>
                        <Typography variant="button" display="block" component="span">
                            <FormattedMessage id="or" />
                        </Typography>
                    </Divider>
                    <Button
                        fullWidth
                        endIcon={<GoogleIcon />}
                        sx={{ mb: "10px", justifyContent: "space-between" }}
                        variant="outlined">
                        <FormattedMessage id="signInWith" /> Google
                    </Button>
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
                    <Typography
                        sx={{ mt: 2, textAlign: "center" }}
                        variant="button"
                        display="block"
                        component="span">
                        <FormattedMessage id="noAccount" />{" "}
                        <Link>
                            <FormattedMessage id="register" />
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
