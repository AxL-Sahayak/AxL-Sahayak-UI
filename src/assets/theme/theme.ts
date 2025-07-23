import { createTheme } from '@mui/material';
import { appColors } from './app-colors';

export const theme = createTheme({
    typography: {
        fontFamily: 'Roboto', // fontFamily: "Poppins",
    },
    palette: appColors,
});
