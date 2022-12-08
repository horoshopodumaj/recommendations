import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Menu, MenuItem, Toolbar, Typography, Box, Button, InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

const Header = () => {
    const isAuth = false;
    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <Link to="/" className="logo appbar__logo">
                        CP
                    </Link>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                </Box>
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <Button sx={{ my: 2, display: "block" }}>
                        <Link to="/films" className="chapter">
                            Films
                        </Link>
                    </Button>
                    <Button sx={{ my: 2, display: "block" }}>
                        <Link to="/books" className="chapter">
                            Books
                        </Link>
                    </Button>
                    {isAuth ? (
                        <Button sx={{ my: 2, display: "block" }}>
                            <Link to="/" className="chapter">
                                logout
                            </Link>
                        </Button>
                    ) : (
                        <Button sx={{ my: 2, display: "block" }}>
                            <Link to="/" className="chapter">
                                login
                            </Link>
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
