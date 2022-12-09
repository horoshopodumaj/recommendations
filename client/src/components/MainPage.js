import { Container, Divider } from "@mui/material";
import React from "react";

export default function MainPage() {
    return (
        <Container>
            <div>Tag Cloud</div>
            <Divider />
            <div>New Reviews</div>
            <Divider />
            <div>Popular Reviews</div>
        </Container>
    );
}
