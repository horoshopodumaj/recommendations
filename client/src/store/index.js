import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/currentUserSlice";
import groupReducer from "./slices/groupSlice";

export default configureStore({
    reducer: {
        currentUser: currentUserReducer,
        categories: groupReducer,
    },
});
