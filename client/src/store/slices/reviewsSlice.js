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
    statusLatest: "loading",
    biggestRateReviews: [],
    statusBiggest: "loading",
};

export const reviews = createSlice({
    name: "reviews",
    initialState,
    extraReducers: {
        [getLatestReviews.pending]: (state) => {
            state.latestReviews = [];
            state.statusLatest = "loading";
        },
        [getLatestReviews.fulfilled]: (state, action) => {
            state.latestReviews = action.payload.rows;
            state.statusLatest = "success";
        },
        [getLatestReviews.rejected]: (state) => {
            state.latestReviews = [];
            state.statusLatest = "error";
        },
        [getBiggestRateReviews.pending]: (state) => {
            state.biggestRateReviews = [];
            state.statusBiggest = "loading";
        },
        [getBiggestRateReviews.fulfilled]: (state, action) => {
            state.biggestRateReviews = action.payload.rows;
            state.statusBiggest = "success";
        },
        [getBiggestRateReviews.rejected]: (state) => {
            state.biggestRateReviews = [];
            state.statusBiggest = "error";
        },
    },
});

export const selectLatestReviews = (state) => state.reviews.latestReviews;
export const selectStatusLatestReviews = (state) => state.reviews.statusLatest;
export const selectBiggestRateReviews = (state) => state.reviews.biggestRateReviews;
export const selectStatusBiggestReviews = (state) => state.reviews.statusBiggest;

export default reviews.reducer;
