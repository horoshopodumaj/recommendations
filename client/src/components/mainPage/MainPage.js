import React from "react";
import style from "./MainPage.module.scss";
import { Container, Divider, Typography } from "@mui/material";
import Header from "../header/Header";
import { FormattedMessage } from "react-intl";

export default function MainPage() {
    return (
        <>
            <Header position={"fixed"} backgroundColor={"transparent"} boxShadow={"none"} />
            <section className={style.banner}>
                <div className={style.wrapper}>
                    <Container>
                        <Typography
                            component="h3"
                            sx={{
                                fontSize: {
                                    xs: "1.625rem",
                                    sm: "2.7rem",
                                    md: "3.25rem",
                                },
                                textAlign: "center",
                            }}>
                            <FormattedMessage id="title" />
                        </Typography>
                        <Typography
                            component="p"
                            sx={{
                                fontSize: {
                                    xs: "1rem",
                                    md: "1.25rem",
                                },
                                textAlign: "center",
                            }}>
                            <FormattedMessage id="paragraph" />
                        </Typography>
                    </Container>
                </div>
            </section>
            <section style={{ height: "1000px" }}></section>
        </>
    );
}
