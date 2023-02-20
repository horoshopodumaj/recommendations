import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export default function MainLayout() {
    const location = useLocation();
    return (
        <>
            {location.pathname === `/` ? (
                <Header backgroundColor={"transparent"} color={true} />
            ) : (
                <Header />
            )}
            <Outlet />
            <Footer />
        </>
    );
}
