import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { setAuthenticated } from '../state/authReducer';

type BQFn = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

export const createRedirectUnauthorizedFetchQuery =
    (baseQuery: BQFn): BQFn =>
    async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);
        if (result.error && result.error.status === 401) {
            api.dispatch(setAuthenticated(false));
        }
        return result;
    };
