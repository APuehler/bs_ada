import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    InputAdornment,
    Link as MuiLink,
    TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '../../../api/authApi';
import './Auth.scss';
import { useAppDispatch } from '../../../hooks/redux';
import { setToast, Severity } from '../../../state/toastReducer';

const Signup: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [signup, { isLoading, isError, isSuccess }] = useSignup();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            navigate('login', { replace: true });
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

        signup({ email, password });
    };

    const onClickPasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="signup">
            <form className="signup-form" onSubmit={onSubmit}>
                <Card>
                    <CardHeader title="Sign up"></CardHeader>
                    <CardContent>
                        <div className="signup-form__input">
                            <TextField
                                type="text"
                                label="Email"
                                name="email"
                                required={true}
                                fullWidth={true}
                                disabled={isLoading}
                                inputProps={{ pattern: '[^@\\s]+@[^@\\s]+\\.[^@\\s]+' }}
                            />
                        </div>
                        <div className="signup-form__input">
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                name="password"
                                required={true}
                                fullWidth={true}
                                disabled={isLoading}
                                inputProps={{ minLength: 6, maxLength: 40 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={onClickPasswordVisibility}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <div className="signup-actions">
                            <div className="signup-actions__link">
                                <MuiLink component={Link} to="/login">
                                    Already have an account?
                                </MuiLink>
                            </div>
                            <LoadingButton type="submit" variant="contained" fullWidth={true} loading={isLoading}>
                                SIGNUP
                            </LoadingButton>
                        </div>
                    </CardActions>
                </Card>
            </form>
        </div>
    );
};

export default Signup;
