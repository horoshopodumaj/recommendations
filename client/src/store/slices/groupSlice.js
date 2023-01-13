import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../App";

export const getCategories = createAsyncThunk("categories/getCategories", async () => {
    const { data } = await axios.get(`${URL}/api/group`);
    return data;
});

const initialState = {
    categories: [],
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: {
        [getCategories.fulfilled]: (state, action) => {
            state.categories = action.payload;
        },
    },
});

export const selectCategories = (state) => state.categories.categories;

export default categoriesSlice.reducer;
