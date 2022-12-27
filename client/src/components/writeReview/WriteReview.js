import {
    Box,
    Container,
    Grid,
    Rating,
    TextField,
    Typography,
    FormControl,
    FormLabel,
    Modal,
    Button,
    IconButton,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./WriteReview.module.scss";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import Header from "../header";
import { grey } from "@mui/material/colors";
//import style from "./WriteReview.module.scss";
import Footer from "../footer";
import FilePicker from "../dragAndDrop/FilePicker";

const maxLength = 60;

const filter = createFilterOptions();

const categories = ["films", "books", "games"];

const tags = [
    "film",
    "book",
    "2022",
    "2021",
    "Avatar",
    "Аватар",
    "Бакман",
    "jrgrijigrkjdgijopokklk;ll'l'l'lsmd;;k;kkjjlklkjljkk;k;;k",
    "очень длинный тэг",
    " travel",
    "dance",
    "animal",
    "1988",
    "2013",
    "games",
    "favorite books",
    "GTA",
    "summer",
    "winter",
    "весна",
    "зима",
    "forest",
    "games 1973",
    "1984",
    "author",
];

const style = {
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

export default function WriteReview({ open, onClose }) {
    const [rating, setRating] = useState(0);
    const [tag, setTag] = useState([]);
    const [tagList, setTagList] = useState(tags);
    const [maxLengthName, setMaxLengthName] = useState(maxLength);
    const [maxLengthTitleReview, setMaxLengthTitleReview] = useState(maxLength);

    const inputChangeName = (event) => {
        const length = event.target.value.length;
        setMaxLengthName(() => maxLength - length);
    };
    const inputChangeTitleReview = (event) => {
        const length = event.target.value.length;
        setMaxLengthTitleReview(() => maxLength - length);
    };
    return (
        <Modal open={open}>
            <Box sx={style}>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: "10px",
                        top: "9px",
                    }}>
                    <CloseIcon />
                </IconButton>
                <Typography
                    component="h1"
                    sx={{
                        fontSize: {
                            xs: "1.5rem",
                            sm: "2rem",
                        },
                        fontWeight: 500,
                        mb: "8px",
                        textAlign: { xs: "center", sm: "left" },
                    }}>
                    <FormattedMessage id="writeReview" />
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: { xs: "column", sm: "row" },
                        mb: "8px",
                    }}>
                    <Typography sx={{ mr: "10px" }}>
                        <FormattedMessage id="yourRating" />
                    </Typography>
                    <Rating
                        name="authorAssessment"
                        onChange={(event, newValue) => setRating(newValue)}
                        value={rating}
                        max={10}
                    />
                </Box>
                <Box sx={{ mb: "8px" }}>
                    <label htmlFor="chooseCategory">
                        <Typography sx={{ mb: "8px" }}>
                            <FormattedMessage id="selectCategory" />
                        </Typography>
                    </label>
                    <Autocomplete
                        id="chooseCategory"
                        options={categories}
                        renderInput={(params) => (
                            <TextField
                                required
                                {...params}
                                label={<FormattedMessage id="category" />}
                            />
                        )}
                    />
                </Box>
                <Box sx={{ mb: "8px" }}>
                    <label htmlFor="nameWork">
                        <Typography sx={{ mb: "8px" }}>
                            <FormattedMessage id="titleOfThe" />
                        </Typography>
                    </label>
                    <TextField
                        id="nameWork"
                        required
                        label={<FormattedMessage id="placeholderTitleofThe" />}
                        variant="outlined"
                        fullWidth
                        inputProps={{ maxLength: 60 }}
                        onChange={(event) => inputChangeName(event)}></TextField>
                    <Typography
                        sx={{
                            fontSize: "0.75rem",
                            lineHeight: "1.66",
                            letterSpacing: "0.03333em",
                            color: "rgba(0, 0, 0, 0.6)",
                        }}>
                        <FormattedMessage id="maxLength" /> {maxLengthName}{" "}
                        <FormattedMessage id="characters" />
                    </Typography>
                </Box>
                <Box sx={{ mb: "8px" }}>
                    <label htmlFor="title">
                        <Typography sx={{ mb: "8px" }}>
                            <FormattedMessage id="titleYourReview" />
                        </Typography>
                    </label>
                    <TextField
                        id="title"
                        required
                        label={<FormattedMessage id="placeholderTitleReview" />}
                        variant="outlined"
                        fullWidth
                        inputProps={{ maxLength: 60 }}
                        onChange={(event) => inputChangeTitleReview(event)}></TextField>
                    <Typography
                        sx={{
                            fontSize: "0.75rem",
                            lineHeight: "1.66",
                            letterSpacing: "0.03333em",
                            color: "rgba(0, 0, 0, 0.6)",
                        }}>
                        <FormattedMessage id="maxLength" /> {maxLengthTitleReview}{" "}
                        <FormattedMessage id="characters" />
                    </Typography>
                </Box>
                <Box sx={{ mb: "8px" }}>
                    <label htmlFor="reviewdesc">
                        <Typography sx={{ mb: "8px" }}>
                            <FormattedMessage id="textYourReview" />
                        </Typography>
                    </label>
                    <TextField
                        id="reviewdesc"
                        label={<FormattedMessage id="helpOthers" />}
                        variant="outlined"
                        required
                        multiline
                        fullWidth
                        rows={4}
                        inputProps={{ maxLength: 2000 }}
                        sx={{ width: "100%" }}></TextField>
                </Box>
                <Box sx={{ mb: "8px" }}>
                    <label htmlFor="tags">
                        <Typography sx={{ mb: "8px" }}>
                            <FormattedMessage id="selectTags" />
                        </Typography>
                    </label>
                    <Autocomplete
                        multiple
                        limitTags={2}
                        id="tags"
                        options={tagList}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                            <TextField {...params} label={<FormattedMessage id="selectTags" />} />
                        )}
                    />
                </Box>
                <Box sx={{ mb: "8px" }}>
                    <Typography>
                        <FormattedMessage id="uploadPhoto" />
                    </Typography>
                    <FilePicker />
                </Box>
                <Button type="submit" sx={{ float: "right" }} variant="contained">
                    <FormattedMessage id="submit" />
                </Button>
            </Box>
        </Modal>
    );
}
