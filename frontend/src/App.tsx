import { Paper } from '@mui/material';
import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authentication from './ui/Authentication';
import Attendance from './ui/content/authenticated/Attendance';
import Authenticated from './ui/content/authenticated/Authenticated';
import FileUpload from './ui/content/authenticated/FileUpload';
import Login from './ui/content/public/Login';
import Signup from './ui/content/public/Signup';
import Layout from './ui/Layout';
import PublicPage from './ui/content/public/PublicPage';
import Toast from './ui/Toast';

const App: React.FC = () => {
    return (
        <Paper square={true} className="app">
            <BrowserRouter>
                <Toast />
                <Authentication />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route element={<Layout />}>
                        <Route path="/" element={<PublicPage />} />
                        <Route element={<Authenticated />}>
                            <Route path="/attendance" element={<Attendance />} />
                            <Route path="/upload" element={<FileUpload />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Paper>
    );
};

export default App;
