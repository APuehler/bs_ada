import { configureStore } from '@reduxjs/toolkit';
import { attendanceApi } from '../api/attendanceApi';
import { authApi } from '../api/authApi';
import { fileUploadApi } from '../api/fileUploadApi';
import authReducer from './authReducer';
import toastReducer from './toastReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        toast: toastReducer,
        [authApi.reducerPath]: authApi.reducer,
        [attendanceApi.reducerPath]: attendanceApi.reducer,
        [fileUploadApi.reducerPath]: fileUploadApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, attendanceApi.middleware, fileUploadApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
