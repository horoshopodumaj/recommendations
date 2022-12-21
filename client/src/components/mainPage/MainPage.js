import { Container, Divider } from "@mui/material";
import React from "react";
import Header from "../header/Header";
import style from "./MainPage.module.scss";

export default function MainPage() {
    return (
        <>
            <Header position={"fixed"} backgroundColor={"transparent"} boxShadow={"none"} />
            <section className={style.banner}>
                <div className={style.wrapper}>
                    <Container>
                        <div>Tag Cloud</div>
                        <Divider />
                        <div>New Reviews</div>
                        <Divider />
                        <div>Popular Reviews</div>
                    </Container>
                </div>
            </section>
            <section style={{ height: "1000px" }}></section>
        </>
    );
}
