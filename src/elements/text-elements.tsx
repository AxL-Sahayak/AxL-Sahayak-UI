import { styled, Typography } from '@mui/material';

type CustomTypographyProps = {
    color?: 'primary' | 'secondary' | 'info' | 'success' | 'error' | 'warning' | string;
    fontWeight?: 300 | 400 | 500 | 600 | 700 | 800;
    type?: 'header' | 'subHeader' | 'content' | 'menuItems' | 'information' | 'cardHeader' | 'cardNumber';
};

export const CustomTypography = styled(Typography)<CustomTypographyProps>(({ color = 'primary', fontWeight, type = 'content' }) => {
    return {
        '&&&': {
            ...(type === 'header' && {
                color: color,
                fontWeight: fontWeight || 300,
                fontSize: '28px',
                // textTransform: 'uppercase',
            }),
            ...(type === 'subHeader' && {
                color: color || '#FFFFFF',
                fontWeight: fontWeight || 300,
                fontSize: '24px',
                textTransform: 'uppercase',
            }),
            ...(type === 'information' && {
                color: color,
                fontWeight: fontWeight || 300,
                fontSize: '12px',
            }),
            ...(type === 'menuItems' && {
                color: color,
                fontWeight: fontWeight || 300,
                fontSize: '16px',
            }),
            ...(type === 'content' && {
                color: color,
                fontWeight: fontWeight || 300,
                fontSize: '14px',
            }),
            ...(type === 'cardHeader' && {
                color: color,
                fontWeight: fontWeight || 300,
                fontSize: '17px',
                textTransform: 'none',
                textAlign: 'left',
            }),
            ...(type === 'cardNumber' && {
                color: color,
                fontWeight: fontWeight || 300,
                fontSize: '50px',
            }),
        },
    };
});
