import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../App";

export const getTags = createAsyncThunk("tags/getTags", async () => {
    const { data } = await axios.get(`${URL}/api/tag`);
    return data;
});

const initialState = {
    tags: [],
    status: "loading",
};

export const tagsSlice = createSlice({
    name: "tags",
    initialState,
    extraReducers: {
        [getTags.pending]: (state) => {
            state.tags = [];
            state.status = "loading";
        },
        [getTags.fulfilled]: (state, action) => {
            state.tags = action.payload;
            state.status = "success";
        },
        [getTags.rejected]: (state) => {
            state.tags = [];
            state.status = "error";
        },
    },
});

export const selectTags = (state) => state.tags.tags;
export const selectTagsStatus = (state) => state.tags.status;

export default tagsSlice.reducer;
