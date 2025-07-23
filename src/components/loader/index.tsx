import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

interface CustomLoaderProps {
    open: boolean;
}
const CustomLoader: React.FC<CustomLoaderProps> = ({ open }) => {
    return (
        <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
            <CircularProgress color='inherit' />
        </Backdrop>
    );
};

export default CustomLoader;
