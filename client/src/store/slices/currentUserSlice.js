import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../App";

export const getCurrentUser = createAsyncThunk("currentuser/getCurrentUser", async () => {
    const { data } = await axios.get(`${URL}/api/user/login/success`, { withCredentials: true });
    return data;
});

const initialState = {
    user: null,
};

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        getUser(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: {
        [getCurrentUser.fulfilled]: (state, action) => {
            state.user = action.payload.user;
        },
    },
});

export const selectCurrentUser = (state) => state.currentUser.user;
export const { getUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
