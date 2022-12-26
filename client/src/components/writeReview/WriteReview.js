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
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import { useState } from "react";
import { FormattedMessage } from "react-intl";
import Header from "../header";
import { grey } from "@mui/material/colors";
//import style from "./WriteReview.module.scss";
import Footer from "../footer";

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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    width: "60%",
};

export default function WriteReview({ open, onClose }) {
    const [rating, setRating] = useState(0);
    const [tag, setTag] = useState([]);
    const [tagList, setTagList] = useState(tags);
    const [maxLengthInput, setMaxLengthInput] = useState(maxLength);

    const inputChange = (event) => {
        const length = event.target.value.length;
        setMaxLengthInput(() => maxLength - length);
    };
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography
                    component="h1"
                    sx={{
                        fontSize: {
                            xs: "1.5rem",
                            sm: "2rem",
                        },
                        fontWeight: 500,
                        // textAlign: "center",
                        // textTransform: "capitalize",
                    }}>
                    Write a review
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: { xs: "column", sm: "row" },
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
                <Box>
                    <Autocomplete
                        placeholder="Placeholder"
                        options={categories}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                    />
                </Box>
                <Box>
                    <Typography>Title of the book!!!</Typography>
                    <TextField
                        id="nameWork"
                        placeholder="Enter the name of the review object you want to write about"
                        variant="outlined"
                        fullWidth
                        helperText={`Maximum length: ${maxLengthInput} characters`}
                        inputProps={{ maxLength: 60 }}
                        onChange={(event) => inputChange(event)}></TextField>
                </Box>
                <Box>
                    <Typography>Title of your review</Typography>
                    <TextField
                        id="title"
                        placeholder="If you could say it in one sentence, what would you say?"
                        variant="outlined"
                        fullWidth
                        helperText={`Maximum length: ${maxLengthInput} characters`}
                        inputProps={{ maxLength: 60 }}
                        onChange={(event) => inputChange(event)}></TextField>
                </Box>
                <Box>
                    <Typography>Your review</Typography>
                    <TextField
                        id="reviewdesc"
                        placeholder="Write your review to help others learn about this content "
                        variant="outlined"
                        multiline
                        fullWidth
                        rows={4}
                        inputProps={{ maxLength: 2000 }}
                        sx={{ width: "100%" }}></TextField>
                </Box>
                <Box>
                    <Autocomplete
                        multiple
                        limitTags={2}
                        id="tags-standard"
                        options={tagList}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Multiple values"
                                placeholder="Favorites"
                            />
                        )}
                    />
                </Box>
            </Box>
        </Modal>
    );
}
