import { createContext } from "react";
import { LOCALES } from "../i18n/locales";

const GlobalContext = createContext({
    showBorders: false,
    locale: LOCALES.EN,
});

export default GlobalContext;
