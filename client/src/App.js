import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { getCurrentUser, selectCurrentUser } from "./store/slices/currentUserSlice";
import { getCategories, selectCategories } from "./store/slices/groupSlice";
import AdminPage from "./pages/adminPage/AdminPage";
import NotFound from "./pages/notFound/NotFound";
import Footer from "./components/footer";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
    const [currentLocale, setCurrentLocale] = useState(
        localStorage.getItem("language") || LOCALES.EN
    );
    const dispatch = useDispatch();

    const categories = useSelector(selectCategories);
    const currentUser = useSelector(selectCurrentUser);

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
                        {currentUser && currentUser.role === "ADMIN" ? (
                            <Route path="/admin" element={<AdminPage />} />
                        ) : (
                            <Route path="/admin" element={<NotFound />} />
                        )}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </div>
            </IntlProvider>
        </GlobalContext.Provider>
    );
}

export default App;
