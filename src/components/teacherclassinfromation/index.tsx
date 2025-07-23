import { Grid } from '@mui/material';
import { CustomTypography } from '../../elements/text-elements';

const TeacherClassInformation = () => {
    return (
        <Grid
            width={'100%'}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                rowGap: 3,
            }}
        >
            <CustomTypography sx={{ width: '50%' }} type='menuItems' fontWeight={800} color='secondary'>
                Class : IV
            </CustomTypography>
            <CustomTypography sx={{ width: '50%' }} type='menuItems' fontWeight={800} color='secondary'>
                Date: 6-6-2025
            </CustomTypography>
            <CustomTypography sx={{ width: '50%' }} type='menuItems' fontWeight={800} color='secondary'>
                Total Students : 15
            </CustomTypography>
        </Grid>
    );
};

export default TeacherClassInformation;
