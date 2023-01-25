import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../App";

export const setComment = createAsyncThunk(
    "comment/setComment",
    async ({ description, date, userId, reviewId }, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axios.post(`${URL}/api/comment`, {
                description,
                date,
                userId,
                reviewId,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    comment: "",
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        addComment(state, action) {
            state.comment = action.payload;
        },
    },
});

export const { addComment } = commentSlice.actions;

export default commentSlice.reducer;
