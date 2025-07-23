import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useGetMyCohorts } from '../home/home.api';

interface Option {
    label: string;
    value: string | number;
}

interface CustomSelectProps {
    label: string;
    value: string | number;
    onChange: (value: string | number) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, onChange }) => {
    const { data } = useGetMyCohorts();
    const cohortList = data?.data?.responseObj?.responseDataParams?.data || [];
    interface CohortDetails {
        class: string;
        section: string;
        language: string;
    }

    interface Cohort {
        cohortId: string | number;
        cohortDetails: CohortDetails;
    }

    // Removed redeclaration of cohortList

    const options: Option[] = cohortList.map((cohort: Cohort) => ({
        label: `${cohort?.cohortDetails?.class} - ${cohort?.cohortDetails?.section} - ${cohort?.cohortDetails?.language}`,
        value: cohort?.cohortId,
    }));
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };

    return (
        <FormControl fullWidth variant='standard' sx={{ minWidth: 120, borderRadius: 2, mb: 3 }}>
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
    );
};

export default CustomSelect;
