import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../store/slices/currentUserSlice";
import Chapters from "./Chapters";
import DrawerMenu from "./DrawerMenu";
import style from "./Header.module.scss";
import UserAuth from "./UserAuth";

const Header = ({ backgroundColor, color }) => {
    const currentUser = useSelector(selectCurrentUser);
    const isAuth = currentUser;
    const [scrolled, setScrolled] = useState(false);

    //const [isSearchOpen, setSearchOpen] = useState(false);
    const [state, setState] = useState({
        left: false,
    });

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 68.5) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    return (
        <AppBar
            className={scrolled ? style.scrolled : ""}
            position={"fixed"}
            sx={{
                backgroundColor: backgroundColor || "white",
                zIndex: 50,
                boxShadow: "none",
                transition: "all 0.3s",
            }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <IconButton
                    sx={{ display: { xs: "flex", md: "none" }, pl: 0 }}
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={toggleDrawer("left", true)}
                    color={color ? "white" : "black"}>
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
                    <Link to="/" style={{ color: color ? "white" : "black" }} className={style.logo + " " + style.appbar__logo}>
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
                    <Link style={{ color: color ? "white" : "black" }} to="/" className={style.logo + " " + style.appbar__logo}>
                        LOGO
                    </Link>
                    {/* <Search color={color} /> */}
                </Box>
                <Chapters color={color} />
                {isAuth ? (
                    <UserAuth color={color} />
                ) : (
                    <Box sx={{ display: "flex" }}>
                        <Link to="/login" className={style.chapter}>
                            <Button sx={{ my: 2, display: "block", color: color ? "white" : "black" }}>login</Button>
                        </Link>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
