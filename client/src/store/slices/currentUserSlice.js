import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
};

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        getUser(state, action) {
            state.user = action.payload;
        },
    },
});

export const { getUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
