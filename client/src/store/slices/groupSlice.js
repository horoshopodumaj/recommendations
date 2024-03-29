import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../App";

export const getCategories = createAsyncThunk("categories/getCategories", async () => {
    const { data } = await axios.get(`${URL}/api/group`);
    return data;
});

export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async (name, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axios.post(`${URL}/api/group`, {
                name,
            });
            dispatch(getCategories());
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    categories: [],
    status: "loading",
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: {
        [getCategories.pending]: (state) => {
            state.categories = [];
            state.status = "loading";
        },
        [getCategories.fulfilled]: (state, action) => {
            state.categories = action.payload;
            state.status = "success";
        },
        [getCategories.rejected]: (state) => {
            state.categories = [];
            state.status = "error";
        },
    },
});

export const selectCategories = (state) => state.categories.categories;
export const selectCategoriesStatus = (state) => state.categories.status;

export default categoriesSlice.reducer;
