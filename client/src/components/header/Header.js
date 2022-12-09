import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "./Search";
import UserAuth from "./UserAuth";
import DrawerMenu from "./DrawerMenu";
import Chapters from "./Chapters";

const Header = () => {
    const isAuth = true;

    //const [isSearchOpen, setSearchOpen] = useState(false);
    const [state, setState] = useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <IconButton
                    sx={{ display: { xs: "flex", md: "none" }, pl: 0 }}
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={toggleDrawer("left", true)}
                    color="inherit">
                    <MenuIcon />
                </IconButton>
                <DrawerMenu state={state} setState={setState} toggleDrawer={toggleDrawer} />
                <Typography
                    variant="h5"
                    noWrap
                    component="div"
                    href=""
                    sx={{
                        mr: 2,
                        display: { xs: "flex", md: "none" },
                        flexGrow: 1,
                        fontFamily: "monospace",
                        fontWeight: 500,
                        color: "inherit",
                        textDecoration: "none",
                    }}>
                    <Link to="/" className="logo appbar__logo">
                        LOGO
                    </Link>
                </Typography>
                <IconButton
                    sx={{ display: { xs: "flex", md: "none" } }}
                    // onClick={() => setSearchOpen(true)}
                >
                    <SearchIcon />
                </IconButton>
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <Link to="/" className="logo appbar__logo">
                        LOGO
                    </Link>
                    <Search />
                </Box>
                <Chapters />
                {isAuth ? (
                    <UserAuth />
                ) : (
                    <Box sx={{ display: "flex" }}>
                        <Button sx={{ my: 2, display: "block" }}>
                            <Link to="/" className="chapter">
                                login
                            </Link>
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
