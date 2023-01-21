import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function NotFound() {
    return (
        <>
            <Header />
            <section
                className="user_summary"
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <div className="wrapper">
                    <Container sx={{ textAlign: "center" }}>
                        <Typography
                            component="h1"
                            sx={{ fontSize: "64px", textAlign: "center", color: "white" }}>
                            404
                        </Typography>
                        <Typography
                            component="p"
                            sx={{
                                fontSize: "48px",
                                textAlign: "center",
                                color: "white",
                                marginBottom: "15px",
                            }}>
                            <FormattedMessage id="pageNotFound" />
                        </Typography>
                        <Link to="/">
                            <Button variant="outlined" sx={{ color: "white" }}>
                                <FormattedMessage id="backHome" />
                            </Button>
                        </Link>
                    </Container>
                </div>
            </section>
            <Footer />
        </>
    );
}
