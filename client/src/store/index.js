import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/currentUserSlice";
import groupReducer from "./slices/groupSlice";
import tagsReducer from "./slices/tagsSlice";
import reviewsReducer from "./slices/reviewsSlice";
import { tagsApi } from "./api/tagsApi";

export default configureStore({
    reducer: {
        currentUser: currentUserReducer,
        categories: groupReducer,
        tags: tagsReducer,
        reviews: reviewsReducer,
        [tagsApi.reducerPath]: tagsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tagsApi.middleware),
});
