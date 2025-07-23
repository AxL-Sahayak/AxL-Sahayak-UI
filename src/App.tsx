import { RouterProvider } from 'react-router-dom';
import routes from './routes/route';
import { useState } from 'react';
import { AlertProp } from './context/context-type';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './assets/theme/theme.ts';
import { Context } from './context/context.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CustomAlert from './components/alert/index.tsx';

const App = () => {
    const queryClient = new QueryClient();
    const [alert, setAlert] = useState<AlertProp | null>({
        open: false,
        message: '',
        severity: 'warning',
    });

    return (
        <QueryClientProvider client={queryClient}>
            <Context.Provider value={{ alert, setAlert }}>
                <ThemeProvider theme={theme}>
                    <CustomAlert />
                    <RouterProvider router={routes} />
                </ThemeProvider>
            </Context.Provider>
        </QueryClientProvider>
    );
};

export default App;
