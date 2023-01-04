import { Box, Rating, TextField, Typography, Modal, Button, IconButton } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./WriteReview.module.scss";
import { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import GlobalContext from "../../contexts/GlobalContext";
import axios from "axios";
import { URL } from "../../App";

const maxLength = 60;
const maxLengthDescription = 2000;

const filter = createFilterOptions();

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
    const { categories, tags, currentUser } = useContext(GlobalContext);
    const [rating, setRating] = useState(5);
    const [category, setCategory] = useState({});
    const [workName, setWorkName] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [tag, setTag] = useState([]);
    const [maxLengthName, setMaxLengthName] = useState(maxLength);
    const [maxLengthDesc, setMaxLengthDesc] = useState(maxLengthDescription);
    const [maxLengthTitleReview, setMaxLengthTitleReview] = useState(maxLength);
    const [previewSource, setPreviewSource] = useState();

    const onFilesChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const onDropFiles = (event) => {
        event.preventDefault();
        previewFile(event.dataTransfer.files[0]);
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    const onDeleteFile = () => {
        setPreviewSource();
    };

    const inputChangeName = (event, newValue) => {
        const length = event.target.value.length;
        setMaxLengthName(() => maxLength - length);
        setWorkName(newValue);
    };
    const inputChangeTitleReview = (event, newValue) => {
        const length = event.target.value.length;
        setMaxLengthTitleReview(() => maxLength - length);
        setTitle(newValue);
    };
    const inputChangeDesc = (event, newValue) => {
        const length = event.target.value.length;
        setMaxLengthDesc(() => maxLengthDescription - length);
        setDesc(newValue);
    };

    const addReview = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("workName", workName);
        formData.append("description", desc);
        formData.append("rating", rating);
        formData.append("groupId", category[0].id);
        formData.append("userId", currentUser.id);
        formData.append("tag", JSON.stringify(tag));
        formData.append("image", previewSource);
        try {
            await axios
                .post(`${URL}/api/review`, formData)
                .then((response) => console.log(response.data));
            onClose();
            setWorkName("");
            setTitle("");
            setDesc("");
            setWorkName("");
            setTag([]);
            setRating(0);
            setPreviewSource();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Modal open={open}>
            <form onSubmit={(event) => addReview(event)}>
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

                    <Box sx={{ mb: "8px" }}>
                        <label htmlFor="chooseCategory">
                            <Typography sx={{ mb: "8px" }}>
                                <FormattedMessage id="selectCategory" />
                            </Typography>
                        </label>
                        <Autocomplete
                            id="chooseCategory"
                            options={categories.map((category) => category.name)}
                            value={category.name}
                            onChange={(event, newValue) => {
                                setCategory(
                                    categories.filter((category) => category.name === newValue)
                                );
                            }}
                            freeSolo
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
                            value={workName}
                            label={<FormattedMessage id="placeholderTitleofThe" />}
                            variant="outlined"
                            fullWidth
                            inputProps={{ maxLength: 60 }}
                            onChange={(event, newValue) =>
                                inputChangeName(event, event.target.value)
                            }></TextField>
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
                            value={title}
                            label={<FormattedMessage id="placeholderTitleReview" />}
                            variant="outlined"
                            fullWidth
                            inputProps={{ maxLength: 60 }}
                            onChange={(event, newValue) =>
                                inputChangeTitleReview(event, event.target.value)
                            }></TextField>
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
                            value={desc}
                            required
                            multiline
                            fullWidth
                            rows={4}
                            inputProps={{ maxLength: 2000 }}
                            onChange={(event, newValue) =>
                                inputChangeDesc(event, event.target.value)
                            }
                            sx={{ width: "100%" }}></TextField>
                        <Typography
                            sx={{
                                fontSize: "0.75rem",
                                lineHeight: "1.66",
                                letterSpacing: "0.03333em",
                                color: "rgba(0, 0, 0, 0.6)",
                            }}>
                            <FormattedMessage id="maxLength" /> {maxLengthDesc}{" "}
                            <FormattedMessage id="characters" />
                        </Typography>
                    </Box>
                    <Box sx={{ mb: "8px" }}>
                        <label htmlFor="tags">
                            <Typography sx={{ mb: "8px" }}>
                                <FormattedMessage id="selectTags" />
                            </Typography>
                        </label>
                        <Autocomplete
                            multiple
                            limitTags={3}
                            id="tags"
                            value={tag}
                            onChange={(event, newValue) => {
                                if (typeof newValue === "string") {
                                    setTag({
                                        name: newValue,
                                    });
                                } else if (newValue && newValue.inputValue) {
                                    setTag({
                                        name: newValue.inputValue,
                                    });
                                } else {
                                    setTag(newValue);
                                }
                            }}
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                const { inputValue } = params;
                                const isExisting = options.some(
                                    (option) => inputValue === option.name
                                );
                                if (inputValue !== "" && !isExisting) {
                                    filtered.push({
                                        inputValue,
                                        name: inputValue,
                                    });
                                }

                                return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            options={tags}
                            getOptionLabel={(option) => {
                                if (typeof option === "string") {
                                    return option;
                                }
                                if (option.inputValue) {
                                    return option.inputValue;
                                }
                                return option.name;
                            }}
                            renderOption={(props, option) => <li {...props}>{option.name}</li>}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={<FormattedMessage id="selectTags" />}
                                />
                            )}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: { xs: "column", sm: "row" },
                            my: "15px",
                        }}>
                        <Typography sx={{ mr: "10px" }}>
                            <FormattedMessage id="yourRating" />
                        </Typography>
                        <Rating
                            name="authorAssessment"
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                            value={rating}
                            max={10}
                        />
                    </Box>
                    <Box sx={{ mb: "8px" }}>
                        <Typography>
                            <FormattedMessage id="uploadPhoto" />
                        </Typography>
                        <div className="FilePicker" onDragOver={onDragOver} onDrop={onDropFiles}>
                            <label
                                className="FilePicker-add AddButton"
                                style={{ marginRight: "10px" }}>
                                <input
                                    className="AddButton-Input"
                                    type="file"
                                    onChange={onFilesChange}
                                    accept="image/*"
                                />
                            </label>
                            {previewSource && (
                                <li className="FileList-Item">
                                    <img
                                        src={previewSource}
                                        alt="picture"
                                        style={{ height: "100px" }}></img>
                                    <button
                                        className="FileList-Delete"
                                        type="button"
                                        onClick={() => onDeleteFile()}
                                    />
                                </li>
                            )}
                        </div>
                    </Box>
                    <Button type="submit" sx={{ float: "right" }} variant="contained">
                        <FormattedMessage id="submit" />
                    </Button>
                </Box>
            </form>
        </Modal>
    );
}
