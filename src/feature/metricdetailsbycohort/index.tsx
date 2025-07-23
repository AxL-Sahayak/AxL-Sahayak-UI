import { Button, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { CustomTypography } from '../../elements/text-elements';
import { GetMetricsDetailsByMetricIdType, useGetMetricDetailsByMetricId } from './metricdetailbycohort.api';
import CustomLoader from '../../components/loader';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useState } from 'react';
import CustomMetricSelect from './metricdetailsbycohortselect';

const MetricDetailsByCohortScreen = () => {
    const { state } = useLocation();
    const cohortId = state?.cohortId || '';
    const metricId = state?.metricId || '';
    // const metricName = state?.metricName || '';
    const [selectedMetric, setSelectedMetric] = useState(metricId || '');
    const { data, isPending } = useGetMetricDetailsByMetricId(cohortId, selectedMetric);
    const metricDetails: GetMetricsDetailsByMetricIdType[] = data?.data?.responseObj?.responseDataParams?.data || [];

    return (
        <Grid display={'flex'} flexDirection={'column'} justifyContent={'start'} rowGap={2} alignItems={'flex-start'} width={'100%'}>
            <CustomLoader open={isPending} />

            <CustomMetricSelect label='Change metric' value={selectedMetric} onChange={setSelectedMetric} />

            <Grid display={'flex'} alignItems={'flex-end'} width={'100%'} justifyContent={'end'} flexDirection={'column'}>
                <CustomTypography type={'information'} color='success' fontWeight={400} sx={{ display: 'flex', alignItems: 'left' }}>
                    {' '}
                    <FiberManualRecordIcon fontSize='small' /> Completed
                </CustomTypography>
                <CustomTypography type={'information'} color='error' fontWeight={400} sx={{ display: 'flex', alignItems: 'center' }}>
                    {' '}
                    <FiberManualRecordIcon fontSize='small' /> Not Completed
                </CustomTypography>
            </Grid>

            {metricDetails.length > 0 &&
                metricDetails?.map((item, index) => (
                    <Button key={index} color={item?.status === 1 ? 'success' : 'error'} variant='outlined' fullWidth>
                        {item.name}
                    </Button>
                ))}
        </Grid>
    );
};

export default MetricDetailsByCohortScreen;
