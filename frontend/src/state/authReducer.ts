import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../api/authApi';
import SessionStorage from '../utils/SessionStorage';

interface AuthState {
    authenticated: boolean;
    userInfo?: UserInfo;
}

const authenticatedKey = 'authenticated';
const userInfoKey = 'userInfo';

const initialState: AuthState = {
    authenticated: SessionStorage.read(authenticatedKey) ?? false,
    userInfo: SessionStorage.read(userInfoKey) ?? undefined,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            if (!action.payload) {
                state.userInfo = undefined;
                SessionStorage.remove(userInfoKey);
            }

            state.authenticated = action.payload;
            SessionStorage.write(authenticatedKey, action.payload);
        },
        setUserInfo: (state, action: PayloadAction<UserInfo | undefined>) => {
            state.userInfo = action.payload;

            if (action.payload) {
                SessionStorage.write(userInfoKey, action.payload);
            } else {
                SessionStorage.remove(userInfoKey);
            }
        },
    },
});

export const { setAuthenticated, setUserInfo } = slice.actions;

export default slice.reducer;
