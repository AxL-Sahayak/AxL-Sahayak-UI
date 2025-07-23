import { Navigate } from 'react-router-dom';
import Layout from '../layout';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token') ? true : false;
    if (token === false) {
        return <Navigate to='/login' replace />;
    }
    return <Layout />;
};

export default ProtectedRoute;
