import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = process.env.REACT_APP_SERVER_URL;

export const groupsApi = createApi({
    reducerPath: "groupsApi",
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (build) => ({
        getGroups: build.query({
            query: () => `/api/group`,
        }),
    }),
});

export const { useGetGroupsQuery } = groupsApi;
