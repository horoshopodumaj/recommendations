import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = process.env.REACT_APP_SERVER_URL;

export const reviewsApi = createApi({
    reducerPath: "reviewsApi",
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (build) => ({
        getMainPageReviews: build.query({
            query: (args) => {
                const { limit, order } = args;
                return {
                    url: `/api/review/latest`,
                    params: { limit, order },
                };
            },
        }),
    }),
});

export const { useGetMainPageReviewsQuery } = reviewsApi;
