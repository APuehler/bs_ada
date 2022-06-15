import { AppBar as MuiAppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../api/authApi';
import { useAppDispatch, useRedux } from '../hooks/redux';
import { setAuthenticated } from '../state/authReducer';

interface AppBarProps {
    openSidebar: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ openSidebar }) => {
    return (
        <MuiAppBar position="sticky">
            <Toolbar>
                <IconButton onClick={openSidebar}>
                    <MenuIcon />
                </IconButton>
                <Typography sx={{ flexGrow: 1 }}>Azubi Digital Akademie</Typography>
                <AuthButton />
            </Toolbar>
        </MuiAppBar>
    );
};

const AuthButton: React.FC = () => {
    const isAuthenticated = useRedux((state) => state.auth.authenticated);
    const [logout] = useLogout();
    const dispatch = useAppDispatch();

    if (isAuthenticated) {
        const onClick = () => {
            logout();
            dispatch(setAuthenticated(false));
        };

        return (
            <Button color="inherit" variant="text" component={Link} to="/" onClick={onClick}>
                Logout
            </Button>
        );
    } else {
        return (
            <>
                <Button color="inherit" variant="text" component={Link} to="/signup">
                    SIGNUP
                </Button>
                <Button color="inherit" variant="text" component={Link} to="/login">
                    LOGIN
                </Button>
            </>
        );
    }
};

export default AppBar;
