import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import style from "./Carousel.module.scss";
import Card from "../card";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 626 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 626, min: 0 },
        items: 1,
    },
};

export default function CarouselMainPage({ larestReviews }) {
    return (
        <Carousel className={style.carousel} responsive={responsive} infinite={true}>
            {larestReviews.map((review) => (
                <div
                    style={{
                        marginRight: "10px",
                        overflow: "hidden",
                        display: "flex",
                        width: "100%",
                    }}>
                    <Card boxShadow={"none"} review={review} />
                </div>
            ))}

            {/* <div
                style={{
                    marginRight: "10px",
                    overflow: "hidden",
                }}>
                <Card boxShadow={"none"} />
            </div>
            <div
                style={{
                    marginRight: "10px",
                    overflow: "hidden",
                }}>
                <Card boxShadow={"none"} />
            </div>
            <div
                style={{
                    marginRight: "10px",
                    overflow: "hidden",
                }}>
                <Card boxShadow={"none"} />
            </div>
            <div
                style={{
                    marginRight: "10px",
                    overflow: "hidden",
                }}>
                <Card boxShadow={"none"} />
            </div>
            <div
                style={{
                    marginRight: "10px",
                    overflow: "hidden",
                }}>
                <Card boxShadow={"none"} />
            </div>
            <div
                style={{
                    marginRight: "10px",
                    overflow: "hidden",
                }}>
                <Card boxShadow={"none"} />
            </div> */}
        </Carousel>
    );
}
