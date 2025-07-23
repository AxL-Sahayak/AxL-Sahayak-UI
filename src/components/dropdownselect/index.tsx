import { FormControl, ListItemText, MenuItem, OutlinedInput, Radio, Select, Typography } from '@mui/material';
import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import { CustomTypography } from '../../elements/text-elements';

interface FieldError {
    message?: string;
}

interface SelectDropDownComponentPropType {
    id: string;
    label: string;
    // handleChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
    selectionList: { id: string; title: string }[];
    control: Control<FieldValues, unknown>;
    errors: { [key: string]: FieldError };
    helperText: string;
}
const SelectDropDownComponent: React.FC<SelectDropDownComponentPropType> = ({ label, control, selectionList, errors, id }) => {
    return (
        <FormControl size='small' sx={{ borderRadius: 2 }} error={(errors as { selectedItem?: boolean }).selectedItem} fullWidth>
            {label && (
                <Typography variant='subtitle2' color='grey' fontWeight={500}>
                    {label}
                </Typography>
            )}
            <Controller
                name={id}
                control={control}
                defaultValue={null}
                render={({ field }) => (
                    <Select
                        size='small'
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value)}
                        input={
                            <OutlinedInput
                                style={{
                                    height: 45,
                                    padding: '0 10px',
                                    borderRadius: 10,
                                }}
                            />
                        }
                        renderValue={(selected) => {
                            const selectedItem = selectionList.find((item) => item.id === selected);
                            return selectedItem ? selectedItem.title : '';
                        }}
                    >
                        {selectionList.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                <Radio checked={field.value === item.id} />
                                <ListItemText primary={item.title} />
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
            <CustomTypography type='information' color='error'>
                {errors?.[id]?.message ? 'Please select a section' : ''}
            </CustomTypography>
        </FormControl>
    );
};

export default SelectDropDownComponent;
