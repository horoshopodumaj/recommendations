import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/material";
import LocalePicker from "./LocalePicker";
import { FormattedMessage } from "react-intl";
import LightModeIcon from "@mui/icons-material/LightMode";
import style from "./Header.module.scss";
import SkeletonCategories from "../skeletons/SkeletonCategories";
import { useSelector } from "react-redux";
import { selectCategories, selectCategoriesStatus } from "../../store/slices/groupSlice";

export default function Chapters({ color }) {
    const pages = useSelector(selectCategories);
    const status = useSelector(selectCategoriesStatus);

    return (
        <Box
            sx={{
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                justifyContent: "flex-end",
                gap: "20px",
            }}>
            {status === "error" ? (
                <div style={{ marginTop: "16px" }}>
                    <FormattedMessage id="error" />
                </div>
            ) : status === "loading" ? (
                <SkeletonCategories />
            ) : (
                pages.map((page) => (
                    <Link
                        key={page.id}
                        to={`/${page.name.toLowerCase()}`}
                        className={style.chapter}>
                        <Button sx={{ my: 2, display: "block", color: color ? "white" : "black" }}>
                            {<FormattedMessage id={`${page.name}`} />}
                        </Button>
                    </Link>
                ))
            )}
            <IconButton sx={{ mb: "3px", mx: "5px", color: color ? "white" : "black" }}>
                <LightModeIcon />
            </IconButton>
            <LocalePicker />
        </Box>
    );
}
