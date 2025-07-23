import { ApiResponse } from '../../utils/apiresponsetype';

export type LoginCredentialProps = {
    userName: string;
    password: string;
};

interface LoginResponseData {
    userName: string;
    role: string;
    token: string;
}
export type LoginResponse = ApiResponse<LoginResponseData>;
