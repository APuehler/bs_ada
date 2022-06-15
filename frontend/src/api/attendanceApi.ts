import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { createRedirectUnauthorizedFetchQuery } from './redirectUnauthorizedFetchQuery';

const baseQuery = fetchBaseQuery({ baseUrl: process.env.REACT_APP_ATTENDANCE_API });

// TODO implement API
export const attendanceApi = createApi({
    reducerPath: 'attendanceApi',
    baseQuery: createRedirectUnauthorizedFetchQuery(baseQuery),
    endpoints: (builder) => ({}),
});
