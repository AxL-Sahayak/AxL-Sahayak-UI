import { Button, Card, Grid } from '@mui/material';
import { CustomButton } from '../../elements/button-element';
import { UserRoundPlus } from 'lucide-react';
import { CustomTypography } from '../../elements/text-elements';
import { useNavigate } from 'react-router-dom';
import { useGetMyCohorts } from './home.api';
import CustomLoader from '../../components/loader';

const HomeScreen = () => {
    const navigateTo = useNavigate();
    const { data, isPending } = useGetMyCohorts();
    const cohortList = data?.data?.responseObj?.responseDataParams?.data || [];
    return (
        <Grid
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'center'}
            width={'100%'}
            minHeight={{ md: '90vh', xs: '75vh' }}
        >
            <CustomLoader open={isPending} />
            <CustomTypography sx={{ alignSelf: 'flex-start' }} textAlign={'left'} type='header'>
                My cohorts
            </CustomTypography>
            <Grid
                sx={{
                    width: '100%',
                    p: 2,
                    display: cohortList.length == 0 ? 'none' : 'flex',
                    flexDirection: 'column',
                    height: '70vh',
                    overflowY: 'scroll',
                    rowGap: 4,
                }}
            >
                {cohortList.map((item, index) => (
                    <Button sx={{ width: '100%', p: 0 }} key={index} onClick={() => navigateTo('/metric', { state: { cohortId: item?.cohortId } })}>
                        <Card
                            key={index}
                            sx={{
                                width: '100%',
                                py: 3,
                                px: 1,
                                boxShadow: 3,
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                            }}
                        >
                            <CustomTypography color='secondary' textTransform={'capitalize'} type='content' fontWeight={600}>
                                Class : {item?.cohortDetails?.class} -
                            </CustomTypography>
                            <CustomTypography color='secondary' textTransform={'capitalize'} type='content' fontWeight={600}>
                                Section : {item?.cohortDetails?.section} -
                            </CustomTypography>
                            <CustomTypography color='secondary' textTransform={'capitalize'} type='content' fontWeight={600}>
                                Language : {item?.cohortDetails?.language}{' '}
                            </CustomTypography>
                        </Card>
                    </Button>
                ))}
            </Grid>
            {cohortList?.length == 0 && (
                <Grid height={'70vh'} display={'flex'} alignItems={'center'}>
                    <CustomTypography sx={{ display: cohortList?.length > 0 ? 'none' : 'inherit', justifySelf: 'flex-end' }}>
                        No Students added please add them to track
                    </CustomTypography>
                </Grid>
            )}
            <CustomButton
                onClick={() => navigateTo('add-student')}
                sx={{ justifySelf: 'flex-end' }}
                size='large'
                variant='outlined'
                color='secondary'
                startIcon={<UserRoundPlus size={20} strokeWidth={2.5} absoluteStrokeWidth />}
            >
                Add students
            </CustomButton>
        </Grid>
    );
};

export default HomeScreen;
