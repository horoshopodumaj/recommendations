import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/material";
import LocalePicker from "./LocalePicker";
import { FormattedMessage } from "react-intl";
import LightModeIcon from "@mui/icons-material/LightMode";
import style from "./Header.module.scss";

const pages = ["films", "books", "games"];

export default function Chapters() {
    return (
        <Box
            sx={{
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                justifyContent: "flex-end",
                gap: "20px",
            }}>
            {pages.map((page) => (
                <Link key={page} to={`/${page.toLowerCase()}`} className={style.chapter}>
                    <Button sx={{ my: 2, display: "block", color: "white" }}>
                        {<FormattedMessage id={`${page}`} />}
                    </Button>
                </Link>
            ))}
            <IconButton sx={{ mb: "3px", mx: "5px" }}>
                <LightModeIcon />
            </IconButton>
            <LocalePicker />
        </Box>
    );
}
