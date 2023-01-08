import React, { useContext, useState } from "react";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Rating,
    Badge,
    Typography,
    Modal,
    Button,
} from "@mui/material";
import GlobalContext from "../../contexts/GlobalContext";
import { FormattedMessage } from "react-intl";
import UserAvatar from "../avatar/UserAvatar";
import { grey } from "@mui/material/colors";

const styleChild = {
    bgcolor: "background.paper",
    borderRadius: { xs: "0", sm: "10px" },
    boxShadow: 24,
    p: 4,
    width: { xs: "auto", sm: "80%", md: "60%" },
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: { xs: "0 auto", sm: "20px auto" },
    overflowY: "auto",
};
export default function ChildModal({
    rating,
    category,
    workName,
    title,
    desc,
    tag,
    previewSource,
}) {
    const { currentUser } = useContext(GlobalContext);
    const [openChild, setOpenChild] = useState(false);

    const handleOpen = () => {
        setOpenChild(true);
    };
    const handleClose = () => {
        setOpenChild(false);
    };
    return (
        <>
            <Button variant="contained" onClick={handleOpen}>
                <FormattedMessage id="preview" />
            </Button>
            <Modal
                hideBackdrop
                open={openChild}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description">
                <Box sx={{ ...styleChild }}>
                    <Card sx={{ mb: "30px" }}>
                        <Grid
                            container
                            sx={{
                                padding: { xs: "20px 12px 0", sm: "25px 25px 0" },
                            }}
                            spacing={3}>
                            <Grid item xs={12} md={3} sm={12}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: {
                                            xs: "center",
                                            sm: "flex-start",
                                        },
                                        mb: "10px",
                                    }}>
                                    <Badge
                                        overlap="circular"
                                        color="secondary"
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right",
                                        }}>
                                        <UserAvatar
                                            width={"50px"}
                                            height={"50px"}
                                            name={currentUser.name}
                                        />
                                    </Badge>
                                </Box>
                                <Typography
                                    sx={{
                                        mb: "10px",
                                        fontWeight: 500,
                                        textAlign: { xs: "center", sm: "left" },
                                    }}>
                                    {currentUser.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        mb: "10px",
                                        textAlign: { xs: "center", sm: "left" },
                                    }}>{`"${workName}"`}</Typography>
                                {previewSource && (
                                    <CardMedia
                                        component="img"
                                        height="auto"
                                        image={previewSource}
                                        alt="picture"
                                    />
                                )}
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={9}
                                sm={12}
                                sx={{ display: "flex", flexDirection: "column" }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flexDirection: { xs: "column", sm: "row" },
                                    }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: {
                                                xs: "column",
                                                sm: "row",
                                            },
                                            order: { xs: 2, sm: 1 },
                                            mb: "10px",
                                        }}>
                                        <Typography
                                            sx={{
                                                mr: "10px",
                                                fontStyle: "oblique",
                                            }}>
                                            <FormattedMessage id="usersRate" />
                                        </Typography>
                                        <Rating name="usersRating" readOnly />
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mb: "10px",
                                        flexDirection: { xs: "column", sm: "row" },
                                    }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: {
                                                xs: "column",
                                                sm: "row",
                                            },
                                            mb: "10px",
                                        }}>
                                        <Typography
                                            sx={{
                                                mr: "10px",
                                                fontStyle: "oblique",
                                            }}>
                                            <FormattedMessage id="authorAssessment" />
                                        </Typography>
                                        <Rating
                                            name="authorAssessment"
                                            readOnly
                                            value={rating}
                                            max={10}
                                        />
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontStyle: "oblique",
                                            opacity: "0.8",
                                            textAlign: "right",
                                            textTransform: "capitalize",
                                        }}>
                                        {Object.keys(category).length > 0 && (
                                            <FormattedMessage id={`${category[0].name}`} />
                                        )}
                                    </Typography>
                                </Box>
                                <CardContent
                                    sx={{
                                        px: "0",
                                        display: "flex",
                                        flexDirection: "column",
                                        flex: 1,
                                    }}>
                                    <Typography
                                        noWrap
                                        mb="10px"
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: "1.25rem",
                                            textAlign: {
                                                xs: "center",
                                                sm: "left",
                                            },
                                        }}>
                                        {title}
                                    </Typography>
                                    <Typography sx={{ textAlign: "justify" }}>{desc}</Typography>
                                </CardContent>
                                <CardActions
                                    sx={{
                                        flexDirection: "column",
                                        px: "0",
                                        alignItems: "flex-start",
                                    }}>
                                    <Box sx={{ overflow: "hidden" }}>
                                        {tag.length > 0 &&
                                            tag.map((item) => (
                                                <Box
                                                    key={item.name}
                                                    sx={{
                                                        maxWidth: "80px",
                                                        backgroundColor: grey[100],
                                                        display: "inline-block",
                                                        padding: "4px 10px",
                                                        margin: "2.5px",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "1px",
                                                        borderRadius: "3px",
                                                        textDecoration: "none",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                        color: "#1976d2",
                                                    }}>
                                                    <Typography sx={{ fontSize: "0.9rem" }} noWrap>
                                                        {item.name}
                                                    </Typography>
                                                </Box>
                                            ))}
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignSelf: "flex-end",
                                            alignItems: "center",
                                            marginTop: "10px",
                                        }}></Box>
                                </CardActions>
                            </Grid>
                        </Grid>
                    </Card>
                    <Button sx={{ float: "right" }} onClick={handleClose}>
                        <FormattedMessage id="close" />
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
