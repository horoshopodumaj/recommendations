import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../App";

export const getGroupPosts = createAsyncThunk(
    "getPosts/getGroupPosts",
    async ({ id, limit, page }) => {
        const { data } = await axios.get(`${URL}/api/review/category/${id}`, {
            params: {
                limit,
                page,
            },
        });
        return data;
    }
);

const initialState = {
    posts: [],
    postsCount: 0,
    status: "loading",
};

export const getPosts = createSlice({
    name: "getPosts",
    initialState,
    extraReducers: {
        [getGroupPosts.pending]: (state) => {
            state.status = "loading";
            state.posts = [];
            state.postsCount = 0;
        },
        [getGroupPosts.fulfilled]: (state, action) => {
            state.status = "success";
            state.posts = action.payload.rows;
            state.postsCount = action.payload.count;
        },
        [getGroupPosts.rejected]: (state) => {
            state.status = "error";
            state.posts = [];
            state.postsCount = 0;
        },
    },
});

export const selectPosts = (state) => state.getPosts.posts;
export const selectPostsCount = (state) => state.getPosts.postsCount;
export const selectStatus = (state) => state.getPosts.status;

export default getPosts.reducer;
