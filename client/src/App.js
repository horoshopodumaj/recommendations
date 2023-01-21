import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IntlProvider } from "react-intl";
import Login from "./pages/loginPage";
import { LOCALES } from "../src/i18n/locales";
import { messages } from "../src/i18n/messages";
import GlobalContext from "./contexts/GlobalContext";
import { getCurrentUser } from "./store/slices/currentUserSlice";
import { getCategories } from "./store/slices/groupSlice";
import MainRoutes from "./routes/MainRoutes";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
    const [currentLocale, setCurrentLocale] = useState(
        localStorage.getItem("language") || LOCALES.EN
    );
    const dispatch = useDispatch();

    const getTheCurrentUser = async () => {
        dispatch(getCurrentUser());
    };

    const getTheCategories = async () => {
        dispatch(getCategories());
    };

    useEffect(() => {
        getTheCurrentUser();
        getTheCategories();
    }, []);

    return (
        <GlobalContext.Provider value={{ currentLocale, setCurrentLocale }}>
            <IntlProvider
                onError={(err) => {
                    if (err.code === "MISSING_TRANSLATION") {
                        //console.warn("Missing translation", err.message);
                        return;
                    }
                    throw err;
                }}
                messages={messages[currentLocale]}
                locale={currentLocale}
                defaultLocale={LOCALES.EN}>
                <div className="App">
                    <Routes>
                        <Route path="/*" element={<MainRoutes />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </IntlProvider>
        </GlobalContext.Provider>
    );
}

export default App;
