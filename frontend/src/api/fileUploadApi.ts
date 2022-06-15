import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { createRedirectUnauthorizedFetchQuery } from './redirectUnauthorizedFetchQuery';

const baseQuery = fetchBaseQuery({ baseUrl: process.env.REACT_APP_FILE_UPLOAD_API });

// TODO implement API
export const fileUploadApi = createApi({
    reducerPath: 'fileUploadApi',
    baseQuery: createRedirectUnauthorizedFetchQuery(baseQuery),
    endpoints: (builder) => ({}),
});
