import React from "react";
import { Link } from "react-router-dom";
import LocalePicker from "./LocalePicker";
import { Drawer, List, ListItem, ListItemButton, Box, IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/slices/groupSlice";

export default function DrawerMenu({ state, setState, toggleDrawer }) {
    const pages = useSelector(selectCategories);

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
                        <Link key={page.id} to={`/${page.name.toLowerCase()}`}>
                            <ListItem
                                sx={{
                                    "&:hover": {
                                        color: "#1877F2",
                                    },
                                    textTransform: "uppercase",
                                    color: "black",
                                }}>
                                <FormattedMessage id={`${page.name}`} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}
