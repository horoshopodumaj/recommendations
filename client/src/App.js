import { Route, Routes } from "react-router-dom";
import { IntlProvider } from "react-intl";
import Books from "./components/Books";
import Films from "./components/Films";
import Games from "./components/Games";
import Header from "./components/header";
import Login from "./pages/loginPage";
import MainPage from "./pages/mainPage";
import UserPage from "./components/UserPage";
import { LOCALES } from "../src/i18n/locales";
import { messages } from "../src/i18n/messages";
import { useState } from "react";
import GlobalContext from "./contexts/GlobalContext";

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
                    {/* <Header /> */}
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<UserPage />}>
                            <Route path=":userId" element={<UserPage />} />
                        </Route>
                        <Route path="/films" element={<Films />} />
                        <Route path="/books" element={<Books />} />
                        <Route path="/games" element={<Games />} />
                    </Routes>
                </div>
            </IntlProvider>
        </GlobalContext.Provider>
    );
}

export default App;
