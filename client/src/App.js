import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IntlProvider } from "react-intl";
import Login from "./pages/loginPage";
import MainPage from "./pages/mainPage";
import UserPage from "./pages/userPage";
import { LOCALES } from "../src/i18n/locales";
import { messages } from "../src/i18n/messages";
import GlobalContext from "./contexts/GlobalContext";
import ContentPage from "./pages/contentPage";
import AllReviewPage from "./pages/allReviewPage";
import ReviewPage from "./pages/reviewPage";
import TagsPage from "./pages/tagsPage";
import { getCurrentUser } from "./store/slices/currentUserSlice";
import { useGetGroupsQuery } from "./store/api/groupsApi";
import { getCategories } from "./store/slices/groupSlice";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
    const [currentLocale, setCurrentLocale] = useState(
        localStorage.getItem("language") || LOCALES.EN
    );
    const dispatch = useDispatch();
    const { data: categories = [] } = useGetGroupsQuery();

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
        <GlobalContext.Provider value={{ currentLocale, setCurrentLocale, categories }}>
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
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/all" element={<AllReviewPage />} />
                        <Route path="/profile/:id" element={<UserPage />} />
                        <Route path="/review/:id" element={<ReviewPage />} />
                        <Route path="/tag/:id" element={<TagsPage />} />
                        {categories.map((category) => (
                            <Route
                                key={category.id}
                                path={`/${category.name.toLowerCase()}`}
                                element={<ContentPage category={category} />}
                            />
                        ))}
                    </Routes>
                </div>
            </IntlProvider>
        </GlobalContext.Provider>
    );
}

export default App;
