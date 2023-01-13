import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/currentUserSlice";
import groupReducer from "./slices/groupSlice";
import tagsReducer from "./slices/tagsSlice";
import reviewsReducer from "./slices/reviewsSlice";

export default configureStore({
    reducer: {
        currentUser: currentUserReducer,
        categories: groupReducer,
        tags: tagsReducer,
        reviews: reviewsReducer,
    },
});
