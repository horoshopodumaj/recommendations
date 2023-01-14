import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = process.env.REACT_APP_SERVER_URL;

export const tagsApi = createApi({
    reducerPath: "tagsApi",
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (build) => ({
        getTags: build.query({
            query: () => `/api/tag`,
        }),
    }),
});

export const { useGetTagsQuery } = tagsApi;
