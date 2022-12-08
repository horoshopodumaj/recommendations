import { Route, Routes } from "react-router-dom";
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
            </Routes>
        </div>
    );
}

export default App;
