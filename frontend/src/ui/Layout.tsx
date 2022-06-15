import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
    const [isSidebarOpen, toggleSidebar] = useState(false);

    return (
        <div>
            <AppBar openSidebar={() => toggleSidebar(true)} />
            <Sidebar isOpen={isSidebarOpen} closeSidebar={() => toggleSidebar(false)}/>
            <Outlet />
        </div>
    );
};

export default Layout;
