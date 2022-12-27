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
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
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
                <Button onClick={onClose} sx={{ float: "right", paddingRight: "0" }}>
                    <FormattedMessage id="close" />
                </Button>
                <Typography
                    component="h1"
                    sx={{
                        fontSize: {
                            xs: "1.5rem",
                            sm: "2rem",
                        },
                        fontWeight: 500,
                    }}>
                    <FormattedMessage id="writeReview" />
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
                        renderInput={(params) => (
                            <TextField
                                InputLabelProps={{ required: "true" }}
                                {...params}
                                label={<FormattedMessage id="category" />}
                            />
                        )}
                    />
                </Box>
                <Box>
                    <Typography>
                        <FormattedMessage id="titleOfThe" />
                    </Typography>
                    <TextField
                        id="nameWork"
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
                <Box>
                    <Typography>
                        <FormattedMessage id="titleYourReview" />
                    </Typography>
                    <TextField
                        id="title"
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
                <Box>
                    <label htmlFor="reviewdesc">
                        <Typography>
                            <FormattedMessage id="textYourReview" />
                        </Typography>
                    </label>
                    <TextField
                        id="reviewdesc"
                        //placeholder="Write your review to help others learn about this content "
                        label={<FormattedMessage id="helpOthers" />}
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
                            <TextField {...params} label={<FormattedMessage id="selectTags" />} />
                        )}
                    />
                </Box>
                <Box>
                    <Typography>
                        <FormattedMessage id="uploadPhoto" />
                    </Typography>
                    <FilePicker />
                </Box>
                <Button type="submit" sx={{ float: "right" }}>
                    <FormattedMessage id="submit" />
                </Button>
            </Box>
        </Modal>
    );
}
