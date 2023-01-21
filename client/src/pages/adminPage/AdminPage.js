import {
    Box,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Pagination,
    TextField,
    Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { URL } from "../../App";
import Header from "../../components/header/Header";
import { getAllUsers, selectAllUsers, selectAllUsersCount } from "../../store/slices/usersSlice";

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {},
});

export default function AdminPage() {
    const allUsers = useSelector(selectAllUsers);
    const allUsersCount = useSelector(selectAllUsersCount);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 3;

    const getAllUsersFunc = () => {
        dispatch(getAllUsers({ limit, page: currentPage }));
    };
    const pageCount = Math.ceil(allUsersCount / limit);

    const pageHandler = (event, value) => {
        setCurrentPage(value);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        getAllUsersFunc();
    }, [currentPage]);
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
            <section style={{ flex: 1, display: "flex" }}>
                <Container sx={{ display: "flex", flexDirection: "column" }}>
                    <Grid container>
                        <Grid item xs={12} md={6} sm={12}>
                            <Box sx={{ my: "15px" }}>
                                <Typography variant="h6">
                                    <FormattedMessage id="Add a category" />
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <TextField size="small" />
                                <IconButton>
                                    <SendIcon color="primary" />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sm={12}>
                            <Box sx={{ my: "15px" }}>
                                <Typography variant="h6" sx={{ textAlign: "center" }}>
                                    <FormattedMessage id="allUsers" />
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <List>
                                    {allUsers.map((user) => (
                                        <ListItem key={user.id}>
                                            <Link to={`/profile/${user.id}`}>
                                                <CustomWidthTooltip
                                                    sx={{
                                                        maxWidth: { xs: "200px", md: "500px" },
                                                        textAlign: "center",
                                                    }}
                                                    title={`${URL}/profile/${user.id}`}
                                                    placement="top">
                                                    <ListItemText
                                                        sx={{
                                                            "&.MuiListItemText-root:hover": {
                                                                color: "#1877F2",
                                                            },
                                                            color: "black",
                                                            textTransform: "capitalize",
                                                        }}
                                                        primary={user.name}
                                                    />
                                                </CustomWidthTooltip>
                                            </Link>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                            {allUsersCount > 2 && (
                                <Pagination
                                    count={pageCount}
                                    page={currentPage}
                                    onChange={pageHandler}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </>
    );
}
