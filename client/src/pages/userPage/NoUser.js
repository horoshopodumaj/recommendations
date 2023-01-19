import { Box, Container } from "@mui/material";
import { FormattedMessage } from "react-intl";

export default function NoUser() {
    return (
        <section
            className="user_summary"
            style={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
            <div className="wrapper">
                <Container>
                    <Box
                        sx={{
                            color: "white",
                            fontSize: { xs: "1.3rem", sm: "2rem" },
                            fontWeight: 500,
                        }}>
                        <FormattedMessage id="noUser" />
                    </Box>
                </Container>
            </div>
        </section>
    );
}
