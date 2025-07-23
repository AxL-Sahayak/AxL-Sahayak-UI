import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomTextField from '../../components/textfield';
import { CustomButton } from '../../elements/button-element';
import { LoginCredentialProps, LoginResponse } from './login-type';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from './login.api';
import { Context, ContextTypes } from '../../context/context';
import { AxiosResponse } from 'axios';
import CustomLoader from '../../components/loader';

// Validation schema with regex
const loginSchema = yup.object().shape({
    userName: yup.string().required('User name is required').email('Enter a valid User name'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Minimum 6 characters required')
        .max(20, 'Max 20 characters allowed')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
            'Password must include at least one letter, one number, and one special character'
        ),
});

const LoginForm = () => {
    const navigateTo = useNavigate();
    const context = useContext(Context);
    const { setAlert } = context as ContextTypes;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigateTo('/');
        }
    }, [navigateTo]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: LoginCredentialProps) => {
            return login(data);
        },
        onSuccess: (response: AxiosResponse<LoginResponse>) => {
            if (response?.data?.responseObj?.responseCode === 200) {
                const token = response?.data?.responseObj?.responseDataParams.data.token;
                setAlert({
                    open: true,
                    severity: 'success',
                    message: response?.data?.responseObj?.responseMessage,
                });
                localStorage.setItem('token', token);
                navigateTo('/');
                setAlert({
                    open: false,
                    severity: 'success',
                    message: response?.data?.responseObj?.responseMessage,
                });
            } else {
                setAlert({
                    open: true,
                    severity: 'warning',
                    message: response?.data?.responseObj?.responseMessage,
                });
            }
        },
        onError: (error: unknown) => {
            setAlert({
                open: true,
                severity: 'error',
                message: 'Something went wrong...!',
            });
            return error;
        },
    });

    const onSubmit = (data: LoginCredentialProps) => {
        mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'start',
                flexDirection: 'column',
                rowGap: '26px',
            }}
        >
            <CustomLoader open={isPending} />

            <CustomTextField
                {...register('userName')}
                placeholder='User name'
                label='User name'
                variant='outlined'
                size='small'
                fullWidth
                error={!!errors.userName}
                helperText={errors.userName?.message}
            />

            <CustomTextField
                {...register('password')}
                placeholder='Password'
                label='Password'
                type='password'
                variant='outlined'
                size='small'
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            <CustomButton type='submit' fullWidth variant='contained' size='large' color='secondary' sx={{ mt: 2 }}>
                Login
            </CustomButton>
        </form>
    );
};

export default LoginForm;
