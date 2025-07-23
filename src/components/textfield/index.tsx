import { Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { CustomTypography } from '../../elements/text-elements';

interface CustomTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
    helperText?: React.ReactNode;
    error?: boolean;
    value?: string | number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any; // allows react-hook-form props like onChange, name, ref, etc.
}

const CustomTextField = React.forwardRef<HTMLInputElement, CustomTextFieldProps>(({ label, helperText, error, type, value, ...rest }, ref) => {
    const [isPassword, setIsPassword] = React.useState(false);
    return (
        <Grid width='100%' display='grid' flexDirection='column' alignContent='center' justifyItems='flex-start'>
            {label && (
                <Typography variant='subtitle2' color='grey' fontWeight={500}>
                    {label}
                </Typography>
            )}
            {value ? (
                <>
                    <TextField
                        {...rest}
                        value={value}
                        type={type === 'password' && isPassword ? 'text' : type}
                        inputRef={ref}
                        slotProps={{
                            input: {
                                endAdornment: type === 'password' && (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            size='medium'
                                            sx={{ mr: 0.5 }}
                                            onClick={() => setIsPassword(!isPassword)}
                                            edge='end'
                                            data-testid='password-toggle'
                                        >
                                            {isPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                sx: {
                                    height: 45,
                                    padding: '0 10px',
                                    borderRadius: 2,
                                },
                            },
                        }}
                    />
                </>
            ) : (
                <>
                    {' '}
                    <TextField
                        type={type === 'password' && isPassword ? 'text' : type}
                        {...rest}
                        inputRef={ref}
                        error={error}
                        // helperText={helperText}
                        slotProps={{
                            input: {
                                endAdornment: type === 'password' && (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            size='medium'
                                            sx={{ mr: 0.5 }}
                                            onClick={() => setIsPassword(!isPassword)}
                                            edge='end'
                                            data-testid='password-toggle'
                                        >
                                            {isPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                sx: {
                                    height: 45,
                                    padding: '0 10px',
                                    borderRadius: 2,
                                },
                            },
                        }}
                    />
                    <CustomTypography type='information' bgcolor='error'>
                        {helperText}
                    </CustomTypography>
                </>
            )}
        </Grid>
    );
});

export default CustomTextField;
