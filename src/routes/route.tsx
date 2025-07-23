import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import AddStudentPage from '../pages/addstudent';
import MetricPage from '../pages/metric';
import MetricDetailsByCohortPage from '../pages/metricdetailsbycohort';

const routes = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/add-student',
                element: <AddStudentPage />,
            },
            {
                path: '/metric',
                element: <MetricPage />,
            },
            {
                path: '/metric-details-by-cohort',
                element: <MetricDetailsByCohortPage />,
            },
            {
                path: '*',
                element: <p>404 Error - Nothing here...</p>,
            },
        ],
    },
]);

export default routes;
