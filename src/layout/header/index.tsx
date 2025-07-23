import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { Tooltip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderMenu from './menu';
import { ChevronLeft, User } from 'lucide-react';

const Header = () => {
    const { pathname } = useLocation();
    const navigateTo = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <AppBar position='fixed' elevation={0} color='transparent' sx={{ backgroundColor: '#FAF9F8' }}>
            <Toolbar>
                <IconButton color='inherit' size='medium' onClick={() => pathname !== '/' && navigateTo(-1)}>
                    <ChevronLeft size={30} strokeWidth={3} absoluteStrokeWidth />
                </IconButton>

                <Typography
                    color='secondary'
                    textTransform={'uppercase'}
                    variant='h5'
                    textAlign={'center'}
                    sx={{ flexGrow: 1 }}
                    noWrap
                    component='div'
                    fontWeight={500}
                >
                    Sahayak
                </Typography>
                <Tooltip title={'Click to open profile'} placement='right-start'>
                    <IconButton
                        onClick={handleClick}
                        aria-controls={openMenu ? 'account-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={openMenu ? 'true' : undefined}
                    >
                        <User size={30} color='#000000' strokeWidth={3} absoluteStrokeWidth />
                    </IconButton>
                </Tooltip>
            </Toolbar>
            <HeaderMenu anchorEl={anchorEl} navigateTo={navigateTo} openMenu={openMenu} setAnchorEl={setAnchorEl} />
        </AppBar>
    );
};

export default Header;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    drawerWidth?: number;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
