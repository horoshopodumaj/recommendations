import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/currentUserSlice";
import groupReducer from "./slices/groupSlice";
import tagsReducer from "./slices/tagsSlice";
import reviewsReducer from "./slices/reviewsSlice";
import userInfoReducer from "./slices/usersSlice";
import getPostsReducer from "./slices/groupPostsSlice";
import commentReducer from "./slices/commentSlice";
import { tagsApi } from "./api/tagsApi";
import { groupsApi } from "./api/groupsApi";
import { reviewsApi } from "./api/reviewsApi";

export default configureStore({
    reducer: {
        currentUser: currentUserReducer,
        categories: groupReducer,
        tags: tagsReducer,
        reviews: reviewsReducer,
        userInfo: userInfoReducer,
        getPosts: getPostsReducer,
        comment: commentReducer,
        [tagsApi.reducerPath]: tagsApi.reducer,
        [groupsApi.reducerPath]: groupsApi.reducer,
        [reviewsApi.reducerPath]: reviewsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            tagsApi.middleware,
            groupsApi.middleware,
            reviewsApi.middleware,
        ]),
});
