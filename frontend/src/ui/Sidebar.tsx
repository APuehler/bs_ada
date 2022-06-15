import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
    return (
        <Drawer anchor="left" variant="temporary" open={isOpen} onClose={closeSidebar}>
            <List>
                <ListItem disablePadding={true}>
                    <ListItemButton component={Link} to="/attendance">
                        <ListItemText primary="Attendance" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding={true}>
                    <ListItemButton component={Link} to="/upload">
                        <ListItemText primary="File Upload" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
