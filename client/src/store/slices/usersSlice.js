import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../App";

export const getUserInfo = createAsyncThunk("userInfo/getUserInfo", async ({ id, limit, page }) => {
    const { data } = await axios.get(`${URL}/api/user/profile/${id}`, {
        params: {
            limit,
            page,
        },
    });
    return data;
});

const initialState = {
    user: {},
    posts: [],
    countUserLikes: 0,
    postsCount: 0,
    status: "loading",
};

export const userInfo = createSlice({
    name: "userInfo",
    initialState,
    extraReducers: {
        [getUserInfo.pending]: (state) => {
            state.status = "loading";
            state.user = {};
            state.posts = [];
        },
        [getUserInfo.fulfilled]: (state, action) => {
            state.status = "success";
            state.user = action.payload.user;
            state.posts = action.payload.reviews.rows;
            state.countUserLikes = action.payload.count;
            state.postsCount = action.payload.reviews.count;
        },
        [getUserInfo.rejected]: (state) => {
            state.status = "error";
        },
    },
});

export const selectUser = (state) => state.userInfo.user;
export const selectPosts = (state) => state.userInfo.posts;
export const selectUserLikes = (state) => state.userInfo.countUserLikes;
export const selectPostsCount = (state) => state.userInfo.postsCount;
export const selectStatus = (state) => state.userInfo.status;

export default userInfo.reducer;
