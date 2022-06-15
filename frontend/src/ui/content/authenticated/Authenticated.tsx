import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRedux } from '../../../hooks/redux';

const Authenticated: React.FC = () => {
    const isAuthenticated = useRedux((state) => state.auth.authenticated);
    const location = useLocation();

    if (isAuthenticated) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" state={{ from: location }} replace={true} />;
    }
};

export default Authenticated;
