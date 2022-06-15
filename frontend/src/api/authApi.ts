import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserInfo {
    id: number;
    email: string;
    role: string;
}

export interface SignupRequest {
    email: string; // max 50
    password: string; // min 6 max 40
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_AUTH_API }),
    endpoints: (builder) => ({
        login: builder.mutation<UserInfo, LoginRequest>({
            query: (loginRequest) => ({
                url: 'signin',
                body: loginRequest,
                method: 'POST',
            }),
        }),
        logout: builder.mutation<string, void>({
            query: () => ({
                url: 'signout',
                method: 'POST',
            }),
        }),
        signup: builder.mutation<string, SignupRequest>({
            query: (signupRequest) => ({
                url: 'signup',
                body: signupRequest,
                method: 'POST',
            }),
        }),
        validate: builder.query<string, void>({ query: () => ({ url: 'validate' }) }),
    }),
});

export const useLogin = authApi.endpoints.login.useMutation;
export const useLogout = authApi.endpoints.logout.useMutation;
export const useSignup = authApi.endpoints.signup.useMutation;
export const useValidateAuthentication = authApi.endpoints.validate.useLazyQuery;
