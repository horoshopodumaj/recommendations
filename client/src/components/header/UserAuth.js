import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Tooltip, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { FormattedMessage } from "react-intl";
import { URL } from "../../App";

export default function UserAuth({ color }) {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        window.open(`${URL}/api/user/logout`, "_self");
        setAnchorElUser(null);
    };
    return (
        <Box sx={{ mb: "4px", ml: "5px" }}>
            <Tooltip title="Open settings">
                <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, color: color ? "white" : "black" }}>
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
                    <MenuItem>
                        <FormattedMessage id="my_account" />
                    </MenuItem>
                </Link>
                <Link onClick={logout} style={{ textDecoration: "none", color: "black" }}>
                    <MenuItem>
                        <FormattedMessage id="Logout" />
                    </MenuItem>
                </Link>
            </Menu>
        </Box>
    );
}
