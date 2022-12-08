import { Route, Routes } from "react-router-dom";
import Books from "./components/Books";
import Films from "./components/Films";
import Games from "./components/Games";
import Header from "./components/Header";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import UserPage from "./components/UserPage";

function App() {
    return (
        <div className="App">
            <Header />
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
    );
}

export default App;
