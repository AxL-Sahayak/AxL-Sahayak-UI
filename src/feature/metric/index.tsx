import { Card, Grid } from '@mui/material';
import { CustomTypography } from '../../elements/text-elements';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CustomButton } from '../../elements/button-element';
import CustomSelect from './metricselect';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { GetMetricsByCohortIdType, useGetMetricsByCohortId } from './metric.api';

const MetricScreen = () => {
    const navigateTo = useNavigate();
    const { state } = useLocation();
    const cohortId = state?.cohortId || '';
    const [selectedCohort, setSelectedCohort] = useState(cohortId || '');

    const { data } = useGetMetricsByCohortId(selectedCohort);

    const metricData: GetMetricsByCohortIdType[] = data?.data.responseObj.responseDataParams.data.metrics || [];
    return (
        <Grid
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'start'}
            rowGap={2}
            alignItems={'center'}
            width={'100%'}
            minHeight={{ md: '90vh', xs: '75vh' }}
        >
            <CustomSelect label='Cohort' value={selectedCohort} onChange={setSelectedCohort} />

            {metricData.length > 0 &&
                metricData?.map((item, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: '100%',
                            boxShadow: 3,
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            flexDirection: 'column',
                            borderRadius: 3,
                        }}
                    >
                        <Grid
                            sx={{
                                width: '100%',
                                height: '40px',
                                backgroundColor: '#d7c1ed',
                                p: 2,
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                            }}
                        >
                            <CustomTypography type='cardHeader' fontWeight={600} color='info'>
                                {item?.metricType}
                            </CustomTypography>
                        </Grid>

                        <Grid sx={{ width: '100%', px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <Grid
                                width={'45%'}
                                alignSelf={'center'}
                                display={'flex'}
                                columnGap={2}
                                flexDirection={'row'}
                                flexWrap={'wrap'}
                                justifyContent={'start'}
                                alignItems={'center'}
                                flex={1}
                            >
                                {/* {item?.message} */}
                                {item?.studentList?.map((name, index) => (
                                    <CustomTypography textTransform={'capitalize'} key={index} type='content' fontWeight={500} color='secondary'>
                                        {name?.name} ,
                                    </CustomTypography>
                                ))}
                            </Grid>
                            <Grid
                                width={'45%'}
                                display={'flex'}
                                columnGap={2}
                                flexDirection={'row'}
                                flexWrap={'wrap'}
                                justifyContent={'center'}
                                rowGap={2}
                                alignItems={'center'}
                                flex={1}
                            >
                                <CircularProgressbar
                                    styles={{ root: { width: '50%' } }}
                                    value={Number(item.actualValue)}
                                    maxValue={Number(item.targetValue)}
                                    text={item.value}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            px={2}
                            width={'100%'}
                            alignSelf={'center'}
                            display={'flex'}
                            columnGap={2}
                            flexDirection={'row'}
                            flexWrap={'wrap'}
                            justifyContent={'start'}
                            alignItems={'center'}
                            flex={1}
                        >
                            {item?.message}
                        </Grid>

                        <CustomTypography
                            type='content'
                            fontWeight={500}
                            color='info'
                            sx={{ width: '100%', px: 2, textAlign: 'start' }}
                        ></CustomTypography>
                        <CustomButton
                            onClick={() =>
                                navigateTo('/metric-details-by-cohort', {
                                    state: { cohortId: selectedCohort, metricId: item.id, metricName: item.metricType },
                                })
                            }
                            startIcon={<Eye size={20} strokeWidth={2.25} />}
                            size='medium'
                            variant='text'
                            sx={{ alignSelf: 'self-end' }}
                            fullWidth
                        >
                            View details
                        </CustomButton>
                    </Card>
                ))}
        </Grid>
    );
};

export default MetricScreen;
