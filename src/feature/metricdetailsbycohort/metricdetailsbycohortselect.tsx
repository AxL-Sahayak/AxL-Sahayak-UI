import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useGetMetricsByCohortId } from '../metric/metric.api';
import { useLocation } from 'react-router-dom';
import { CustomTypography } from '../../elements/text-elements';

interface Option {
    label: string;
    value: string | number;
}

interface CustomMetricSelectProps {
    label: string;
    value: string | number;
    onChange: (value: string | number) => void;
}

interface Cohort {
    metricType: string;
    id: string | number;
}

const CustomMetricSelect: React.FC<CustomMetricSelectProps> = ({ label, value, onChange }) => {
    const { state } = useLocation();
    const cohortId = state?.cohortId || '';
    const { data } = useGetMetricsByCohortId(cohortId);
    const cohortList = data?.data?.responseObj?.responseDataParams?.data?.metrics || [];

    const options: Option[] = cohortList.map((cohort: Cohort) => ({
        label: cohort?.metricType,
        value: cohort?.id,
    }));

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };

    const selectedMetric = options.find((opt) => opt.value === value)?.label || '';

    return (
        <>
            <FormControl variant='standard' sx={{ minWidth: 150, borderRadius: 2, alignSelf: 'flex-end' }}>
                <InputLabel sx={{ fontWeight: 'bold' }} size='medium'>
                    {label}
                </InputLabel>
                <Select value={String(value)} onChange={handleChange} label={label}>
                    {options?.map((opt) => (
                        <MenuItem key={opt?.value} value={opt?.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <CustomTypography textAlign={'left'} type='header'>
                {' '}
                {selectedMetric}
            </CustomTypography>
        </>
    );
};

export default CustomMetricSelect;
