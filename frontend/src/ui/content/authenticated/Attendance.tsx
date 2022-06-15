import { Button } from '@mui/material';
import React, { useState } from 'react';

// TODO add API and adjust UI
const Attendance: React.FC = () => {
    const [isCheckedIn, setCheckedIn] = useState(false);

    const onClick = () => {
        setCheckedIn((prevState) => !prevState);
    };

    return (
        <div>
            <Button variant="contained" onClick={onClick}>
                {isCheckedIn ? 'CHECK OUT' : 'CHECK IN'}
            </Button>
        </div>
    );
};

export default Attendance;
