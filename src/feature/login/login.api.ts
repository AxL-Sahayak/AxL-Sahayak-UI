import { headerWithToken } from '../../utils/apiheader';
import { LoginCredentialProps } from './login-type';

export const login = async (data: LoginCredentialProps) => {
    const response = await headerWithToken.post('/teacher/login', data);
    return response;
};
