import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Severity {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Error = 'error',
}

export interface Toast {
    severity: Severity;
    message: string;
    open: boolean;
    autoHideDuration: number | undefined | null;
}

const initialState: Toast = {
    severity: Severity.Info,
    message: '',
    open: false,
    autoHideDuration: null,
};

const slice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast: (state, action: PayloadAction<Toast>) => {
            state = action.payload;
            return state;
        },
    },
});

export const { setToast } = slice.actions;

export default slice.reducer;
