import React, { useEffect } from 'react';
import { useValidateAuthentication } from '../api/authApi';
import { useAppDispatch, useRedux } from '../hooks/redux';
import { setAuthenticated } from '../state/authReducer';

const Authentication: React.FC = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useRedux((state) => state.auth.authenticated);
    const [trigger] = useValidateAuthentication();

    // triggers authentication validation once the app started
    // this is used to validate if the user is still authenticated after a page refresh
    useEffect(() => {
        // if supposedly still authenticated
        if (isAuthenticated) {
            trigger()
                .unwrap()
                .catch(() => {
                    dispatch(setAuthenticated(false));
                });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return null;
};

export default Authentication;
