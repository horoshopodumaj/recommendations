import { Container } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import Header from "../../components/header/Header";

export default function AdminPage() {
    return (
        <>
            <Header />
            <section className="user_summary">
                <div className="wrapper">
                    <Container sx={{ textAlign: "center", fontSize: "28px", color: "white" }}>
                        <FormattedMessage id="welcomeAdmin" />
                    </Container>
                </div>
            </section>
            <section style={{ flex: 1 }}>
                <Container>Users</Container>
            </section>
        </>
    );
}
