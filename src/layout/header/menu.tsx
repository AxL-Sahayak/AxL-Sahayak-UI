import React from 'react';
import { Grid } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';

interface HeaderMenuProps {
    openMenu: boolean;
    setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
    anchorEl: null | HTMLElement;
    navigateTo: (path: string) => void;
}
const HeaderMenu: React.FC<HeaderMenuProps> = ({ openMenu, setAnchorEl, anchorEl, navigateTo }) => {
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={openMenu}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        width: 250,
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 82,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', columnGap: 1, width: '100%' }}>
                <PersonIcon color='info' sx={{ fontSize: '40px' }} fontSize='large' />
                <Grid display={'grid'} flex={1} columnGap={0} alignContent={'center'}>
                    <span style={{ fontSize: '18px' }}>My name </span>
                    {/* <span style={{ fontSize: '14px' }}>my access </span> */}
                </Grid>
            </MenuItem>
            <Divider />

            <MenuItem
                onClick={() => {
                    setTimeout(() => {
                        localStorage.removeItem('token');
                        navigateTo('/login');
                    }, 1000);
                }}
            >
                <ListItemIcon>
                    <Logout fontSize='small' />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
};

export default HeaderMenu;
