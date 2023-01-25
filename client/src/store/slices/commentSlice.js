// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { URL } from "../../App";

// export const getAllCommentsPost = createAsyncThunk(
//     "comment/getAllCommentsPost",
//     async (id, { rejectWithValue }) => {
//         try {
//             const { data } = await axios.get(`${URL}/api/comment/review/${id}`);
//             return data;
//         } catch (error) {
//             rejectWithValue(error.message);
//             console.log(error);
//         }
//     }
// );

// export const setComment = createAsyncThunk(
//     "comment/setComment",
//     async ({ description, date, userId, reviewId }, { rejectWithValue, dispatch }) => {
//         try {
//             const { data } = await axios.post(`${URL}/api/comment`, {
//                 description,
//                 date,
//                 userId,
//                 reviewId,
//             });
//             dispatch(getAllCommentsPost(reviewId));
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// const initialState = {
//     comment: "",
//     postComments: [],
// };

// const commentSlice = createSlice({
//     name: "comment",
//     initialState,
//     reducers: {
//         addComment(state, action) {
//             state.comment = action.payload;
//         },
//     },
//     extraReducers: {
//         [getAllCommentsPost.pending]: (state) => {
//             state.postComments = [];
//         },
//         [getAllCommentsPost.fulfilled]: (state, action) => {
//             state.postComments = action.payload;
//         },
//         [getAllCommentsPost.rejected]: (state) => {
//             state.postComments = [];
//         },
//     },
// });

// export const { addComment } = commentSlice.actions;

// export default commentSlice.reducer;
