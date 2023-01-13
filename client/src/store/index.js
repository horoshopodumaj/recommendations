import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/currentUserSlice";
import groupReducer from "./slices/groupSlice";
import tagsReducer from "./slices/tagsSlice";

export default configureStore({
    reducer: {
        currentUser: currentUserReducer,
        categories: groupReducer,
        tags: tagsReducer,
    },
});
