import { Route, Routes } from "react-router-dom";
import { IntlProvider } from "react-intl";
import Login from "./pages/loginPage";
import MainPage from "./pages/mainPage";
import UserPage from "./pages/userPage";
import { LOCALES } from "../src/i18n/locales";
import { messages } from "../src/i18n/messages";
import { useCallback, useEffect, useState } from "react";
import GlobalContext from "./contexts/GlobalContext";
import ContentPage from "./pages/contentPage";
import WriteReview from "./components/writeReview";
import { usersAPI } from "./api/api";
import axios from "axios";
import AllReviewPage from "./pages/allReviewPage";
import ReviewPage from "./pages/reviewPage";
import TagsPage from "./pages/tagsPage";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
    const [currentLocale, setCurrentLocale] = useState(
        localStorage.getItem("language") || LOCALES.EN
    );
    const [currentUser, setCurrentUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const getTags = useCallback(async () => {
        try {
            await axios.get(`${URL}/api/tag`).then((response) => setTags(response.data));
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        const getUser = async () => {
            try {
                await usersAPI.isAuth().then((data) => setCurrentUser(data.user));
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, []);

    // useEffect(() => {
    //     const getUser = () => {
    //         fetch(`${URL}/api/user/login/success`, {
    //             method: "GET",
    //             credentials: "include",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 "Access-Control-Allow-Credentials": true,
    //             },
    //         })
    //             .then((response) => {
    //                 if (response.status === 200) return response.json();
    //                 throw new Error("authentication has been failed!");
    //             })
    //             .then((resObject) => {
    //                 setCurrentUser(resObject.user);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     };
    //     getUser();
    // }, []);

    const getCategory = useCallback(async () => {
        try {
            await axios.get(`${URL}/api/group`).then((response) => setCategories(response.data));
        } catch (error) {
            console.log(error);
        }
    }, [categories]);

    useEffect(() => {
        getCategory();
        getTags();
    }, [getTags]);

    console.log(currentUser);
    return (
        <GlobalContext.Provider
            value={{ currentLocale, setCurrentLocale, currentUser, categories, tags }}>
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
                        {/* <Route path="/writereview" element={<WriteReview />} /> */}
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
