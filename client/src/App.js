import { Route, Routes } from "react-router-dom";
import { IntlProvider } from "react-intl";
import Login from "./pages/loginPage";
import MainPage from "./pages/mainPage";
import UserPage from "./pages/userPage";
import { LOCALES } from "../src/i18n/locales";
import { messages } from "../src/i18n/messages";
import { useState } from "react";
import GlobalContext from "./contexts/GlobalContext";
import ContentPage from "./pages/contentPage";
import WriteReview from "./components/writeReview";

export const URL = process.env.REACT_APP_SERVER_URL;

const pages = ["films", "books", "games"];

function App() {
    const [currentLocale, setCurrentLocale] = useState(
        localStorage.getItem("language") || LOCALES.EN
    );
    return (
        <GlobalContext.Provider value={{ currentLocale, setCurrentLocale }}>
            <IntlProvider
                messages={messages[currentLocale]}
                locale={currentLocale}
                defaultLocale={LOCALES.EN}>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/writereview" element={<WriteReview />} />
                        <Route path="/profile" element={<UserPage />}>
                            <Route path=":userId" element={<UserPage />} />
                        </Route>
                        {pages.map((page) => (
                            <Route
                                key={page}
                                path={`/${page.toLowerCase()}`}
                                element={<ContentPage category={page.toLowerCase()} />}
                            />
                        ))}
                    </Routes>
                </div>
            </IntlProvider>
        </GlobalContext.Provider>
    );
}

export default App;
