import { Alert, LinearProgress, Snackbar } from '@mui/material';
import { useContext } from 'react';
import { Context, ContextTypes } from '../../context/context';

const CustomAlert = () => {
    const context = useContext(Context);
    const { alert, setAlert } = context as ContextTypes;

    const handleAlertClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setAlert({ ...alert, open: false, message: alert?.message || '', severity: alert?.severity || 'info' });
    };

    const { open = false, message = '', severity = 'info' } = alert || {};

    return (
        <Snackbar
            sx={{ borderRadius: '10px' }}
            open={open}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleAlertClose}
            style={{ zIndex: 5000 }}
        >
            <Alert
                variant='filled'
                elevation={4}
                onClose={handleAlertClose}
                severity={severity}
                sx={{
                    borderRadius: '6px',
                    textTransform: 'none',
                    letterSpacing: '1px',
                }}
            >
                {/* <AlertTitle>{severity}</AlertTitle> */}
                {message}
                <LinearProgress color={severity} />
            </Alert>
        </Snackbar>
    );
};

export default CustomAlert;
