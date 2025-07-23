import { Card, Divider, Grid, Stack } from '@mui/material';
import LoginFrom from './login-form';
import { CustomTypography } from '../../elements/text-elements';

const Login = () => {
    return (
        <Grid width={'100%'} height={'100vh'}>
            <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'space-around'} alignItems={'center'} width={'100%'} height={'100%'}>
                <CustomTypography type='cardNumber' textTransform={'uppercase'} textAlign={'center'} color='primary' fontWeight={600}>
                    Welcome to Sahayak
                </CustomTypography>
                <Card
                    sx={{
                        alignSelf: { xs: 'flex-start', md: 'auto' },
                        maxWidth: { md: '370px', xs: '270px' },
                        width: '100%',
                        borderRadius: 3,
                        px: 4,
                        py: 5,
                        boxShadow: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        rowGap: 2.5,
                    }}
                >
                    <Grid width={'100%'} display={'grid'} flexDirection={'column'} rowGap={1} mb={1}>
                        <CustomTypography type='subHeader' color='info' fontWeight={500}>
                            Login
                        </CustomTypography>
                        <Divider sx={{ width: '100%' }} />
                    </Grid>
                    <LoginFrom />
                </Card>
            </Stack>
        </Grid>
    );
};

export default Login;
