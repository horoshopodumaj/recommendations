import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../App";

export const getLatestReviews = createAsyncThunk("reviews/latestReviews", async () => {
    const { data } = await axios.get(`${URL}/api/review/latest`, {
        params: {
            limit: 4,
            order: "createdAt",
        },
    });
    return data;
});
export const getBiggestRateReviews = createAsyncThunk("reviews/biggestRateReviews", async () => {
    const { data } = await axios.get(`${URL}/api/review/latest`, {
        params: {
            limit: 5,
            order: "rating",
        },
    });
    return data;
});

const initialState = {
    latestReviews: [],
    biggestRateReviews: [],
};

export const reviews = createSlice({
    name: "reviews",
    initialState,
    extraReducers: {
        [getLatestReviews.fulfilled]: (state, action) => {
            state.latestReviews = action.payload.rows;
        },
        [getBiggestRateReviews.fulfilled]: (state, action) => {
            state.biggestRateReviews = action.payload.rows;
        },
    },
});

export const selectLatestReviews = (state) => state.reviews.latestReviews;
export const selectBiggestRateReviews = (state) => state.reviews.biggestRateReviews;

export default reviews.reducer;
