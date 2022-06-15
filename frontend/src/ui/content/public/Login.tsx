import { LoadingButton } from '@mui/lab';
import { Card, CardActions, CardContent, CardHeader, Link as MuiLink, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from '../../../api/authApi';
import { useAppDispatch } from '../../../hooks/redux';
import { setAuthenticated, setUserInfo } from '../../../state/authReducer';
import { setToast, Severity } from '../../../state/toastReducer';
import './Auth.scss';

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [login, { data, isLoading, isError, isSuccess }] = useLogin();

    useEffect(() => {
        if (isSuccess) {
            dispatch(setAuthenticated(true));
            dispatch(setUserInfo(data));
            const locationState = location.state as { from: Location } | undefined;
            const from = locationState?.from.pathname || '/';
            navigate(from, { replace: true });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            dispatch(
                setToast({
                    open: true,
                    message: 'Oops! Something went wrong.',
                    severity: Severity.Error,
                    autoHideDuration: 5000,
                })
            );
        }
    }, [isError]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        login({ email, password });
    };

    return (
        <div className="login">
            <form className="login-form" onSubmit={onSubmit}>
                <Card>
                    <CardHeader title="Login" />
                    <CardContent>
                        <div className="login-form__input">
                            <TextField
                                type="text"
                                label="Email"
                                name="email"
                                required={true}
                                fullWidth={true}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="login-form__input">
                            <TextField
                                type="password"
                                label="Password"
                                name="password"
                                required={true}
                                fullWidth={true}
                                disabled={isLoading}
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <div className="login-actions">
                            <div className="login-actions__link">
                                <MuiLink component={Link} to="/signup">
                                    Create an account
                                </MuiLink>
                            </div>
                            <LoadingButton type="submit" variant="contained" fullWidth={true} loading={isLoading}>
                                LOGIN
                            </LoadingButton>
                        </div>
                    </CardActions>
                </Card>
            </form>
        </div>
    );
};

export default Login;
