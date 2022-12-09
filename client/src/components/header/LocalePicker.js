import React, { useContext } from "react";
import { Select, MenuItem } from "@mui/material";
import GlobalContext from "../../contexts/GlobalContext";
import { LOCALES } from "../../i18n/locales";

export default function LocalePicker() {
    const { currentLocale, setCurrentLocale } = useContext(GlobalContext);

    const handleChange = (event) => {
        setCurrentLocale(event.target.value);
        localStorage.setItem("language", event.target.value);
    };
    return (
        <Select
            value={currentLocale}
            label="lang"
            onChange={handleChange}
            displayEmpty
            sx={{ mr: "10px" }}>
            <MenuItem value={LOCALES.RU}>RU</MenuItem>
            <MenuItem value={LOCALES.EN}>EN</MenuItem>
        </Select>
    );
}
