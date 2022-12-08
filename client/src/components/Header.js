import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    AppBar,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    Box,
    Button,
    InputBase,
    IconButton,
    Tooltip,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    Select,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";

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

const pages = ["films", "books", "games"];

const Header = () => {
    const isAuth = true;
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [lang, setLang] = useState("EN");

    const handleChange = (event) => {
        setLang(event.target.value);
    };
    const [state, setState] = useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <IconButton
                    sx={{ display: { xs: "flex", md: "none" } }}
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={toggleDrawer("left", true)}
                    color="inherit">
                    <MenuIcon />
                </IconButton>
                <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
                    <Box
                        sx={{
                            width: 250,
                            display: { xs: "flex", md: "none" },
                            flexDirection: "column",
                        }}
                        role="presentation"
                        onClick={toggleDrawer("left", false)}
                        onKeyDown={toggleDrawer("left", false)}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <IconButton sx={{ mb: "3px", mx: "10px" }}>
                                <LightModeIcon />
                            </IconButton>
                            <Select
                                value={lang}
                                label="lang"
                                onChange={handleChange}
                                displayEmpty
                                sx={{ mr: "10px" }}>
                                <MenuItem value={"RU"}>RU</MenuItem>
                                <MenuItem value={"EN"}>EN</MenuItem>
                            </Select>
                        </Box>

                        <List>
                            {pages.map((page) => (
                                <ListItem key={page}>
                                    <ListItemButton>
                                        <Link
                                            to={`/${page}`}
                                            style={{
                                                textDecoration: "none",
                                                textTransform: "uppercase",
                                            }}>
                                            {page}
                                        </Link>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>

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
                    onClick={() => setSearchOpen(true)}>
                    <SearchIcon />
                </IconButton>

                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <Link to="/" className="logo appbar__logo">
                        LOGO
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
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        flexGrow: 1,
                        justifyContent: "flex-end",
                        gap: "20px",
                    }}>
                    {pages.map((page) => (
                        <Link to={`/${page}`} className="chapter">
                            <Button key={page} sx={{ my: 2, display: "block", color: "white" }}>
                                {page}
                            </Button>
                        </Link>
                    ))}
                    <IconButton sx={{ mb: "3px", mx: "5px" }}>
                        <LightModeIcon />
                    </IconButton>
                    <Select value={lang} label="lang" onChange={handleChange} displayEmpty>
                        <MenuItem value={"RU"}>RU</MenuItem>
                        <MenuItem value={"EN"}>EN</MenuItem>
                    </Select>
                </Box>

                {isAuth ? (
                    <Box sx={{ mb: "4px", ml: "5px" }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                            <Link
                                onClick={handleCloseUserMenu}
                                to="/profile"
                                style={{ textDecoration: "none", color: "black" }}>
                                <MenuItem>My account</MenuItem>
                            </Link>
                            <Link
                                onClick={handleCloseUserMenu}
                                to="/"
                                style={{ textDecoration: "none", color: "black" }}>
                                <MenuItem>Logout</MenuItem>
                            </Link>
                        </Menu>
                    </Box>
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
