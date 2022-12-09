import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Tooltip, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { FormattedMessage } from "react-intl";

export default function UserAuth() {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
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
                    <MenuItem>
                        <FormattedMessage id="my_account" />
                    </MenuItem>
                </Link>
                <Link
                    onClick={handleCloseUserMenu}
                    to="/"
                    style={{ textDecoration: "none", color: "black" }}>
                    <MenuItem>
                        <FormattedMessage id="Logout" />
                    </MenuItem>
                </Link>
            </Menu>
        </Box>
    );
}
