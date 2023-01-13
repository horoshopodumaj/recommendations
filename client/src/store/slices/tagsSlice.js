import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../App";

export const getTags = createAsyncThunk("tags/getTags", async () => {
    const { data } = await axios.get(`${URL}/api/tag`);
    return data;
});

const initialState = {
    tags: [],
};

export const tagsSlice = createSlice({
    name: "tags",
    initialState,
    extraReducers: {
        [getTags.fulfilled]: (state, action) => {
            state.tags = action.payload;
        },
    },
});

export const selectTags = (state) => state.tags.tags;

export default tagsSlice.reducer;
