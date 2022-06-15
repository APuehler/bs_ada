import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useAppDispatch, useRedux } from '../hooks/redux';
import { setToast } from '../state/toastReducer';

const Toast: React.FC = () => {
    const dispatch = useAppDispatch();
    const { severity, message, open, autoHideDuration } = useRedux((state) => state.toast);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setToast({ open: false, message: '', autoHideDuration: null, severity }));
    };

    return (
        <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
            <Alert severity={severity}>{message}</Alert>
        </Snackbar>
    );
};

export default Toast;
