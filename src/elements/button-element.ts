import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { appColors } from '../assets/theme/app-colors';
import { Chip, ChipProps } from '@mui/material';

type CustomButtonProps = {
    variant: 'contained' | 'outlined' | 'text';
    size: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
};

export const CustomButton = styled(Button)<CustomButtonProps>(({ variant, size, color = 'primary' }) => {
    const colors = appColors;
    const current = colors[color];
    return {
        '&&&': {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: size === 'small' ? '0.75rem' : size === 'medium' ? '0.875rem' : '1rem',
            padding: size === 'small' ? '4px 10px' : size === 'medium' ? '6px 29px' : '8px 44px',
            borderRadius: 9,
            ...(variant === 'contained' && {
                color: current.text,
                background: `radial-gradient(circle 382px at 50% 50.2%, ${current.main} 0.1%, ${current.dark} 100.2%)`,
                '&:hover': {
                    // background: `radial-gradient(circle 382px at 50% 50.2%, ${current.dark} 0.1%, ${current.main} 100.2%)`,
                },
                '&:disabled': {
                    background: '#ccc',
                    color: '#fff',
                },
            }),

            ...(variant === 'outlined' && {
                color: current.main,
                border: `2px solid ${current.main}`,
                background: 'transparent',
                '&:hover': {
                    border: `2px solid ${current.main}`,
                    // color: current.text,
                    // border: `2px solid #fff`,
                    // background: `radial-gradient(circle 382px at 50% 50.2%, ${current.light} 0.1%, ${current.main} 100.2%)`,
                },
                '&:disabled': {
                    color: '#aaa',
                },
            }),
        },
    };
});

interface CustomChipProps extends ChipProps {
    variant?: 'filled' | 'outlined'; // MUI default is 'filled'
    color?: keyof typeof appColors;
}

export const CustomChip = styled(Chip)<CustomChipProps>(({ variant = 'filled', color = 'primary' }) => {
    const colors = appColors;
    const current = colors[color];

    return {
        '&&&': {
            fontWeight: 500,
            fontSize: '0.875rem',
            // height: 28,
            borderRadius: 8,
            padding: '0 12px',
            textTransform: 'capitalize',
            ...(variant === 'filled' && {
                color: current.text,
                background: `radial-gradient(circle 382px at 50% 50.2%, ${current.main} 0.1%, ${current.dark} 100.2%)`,
                '&:hover': {
                    background: `radial-gradient(circle 382px at 50% 50.2%, ${current.dark} 0.1%, ${current.main} 100.2%)`,
                },
                '&.Mui-disabled': {
                    background: '#ccc',
                    color: '#fff',
                },
            }),

            ...(variant === 'outlined' && {
                color: current.main,
                background: 'transparent',
                border: `1.5px solid ${current.main}`,
                // '&:hover': {
                //     color: current.text,
                //     background: `radial-gradient(circle 382px at 50% 50.2%, ${current.light} 0.1%, ${current.main} 100.2%)`,
                // },
                '&.Mui-disabled': {
                    color: '#aaa',
                    borderColor: '#ccc',
                },
            }),
        },
    };
});
