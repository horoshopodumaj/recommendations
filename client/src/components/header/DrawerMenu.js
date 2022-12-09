import React from "react";
import { Link } from "react-router-dom";
import LocalePicker from "./LocalePicker";
import { Drawer, List, ListItem, ListItemButton, Box, IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import { FormattedMessage } from "react-intl";

export default function DrawerMenu({ state, setState, toggleDrawer }) {
    const pages = ["films", "books", "games"];

    return (
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
                    <LocalePicker />
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
                                    <FormattedMessage id={`${page}`} />
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}
