import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { CustomTypography } from '../../elements/text-elements';
import CustomTextField from '../../components/textfield';
import { CustomButton, CustomChip } from '../../elements/button-element';
import SelectDropDownComponent from '../../components/dropdownselect';
import { UserRoundPlus } from 'lucide-react';
import { AddStudentProps, sectionList } from './addstudent.type';
import { UseFormReturn } from 'react-hook-form';

interface LanguageListType {
    id: string;
    title: string;
}

interface AddStudentFormProps {
    form: UseFormReturn<AddStudentProps>;
    studentName: string;
    studentClass: string;
    languageList: LanguageListType[];
    responseMessage: string;
    responseCode: number;
    isPending: boolean;
    handleLanguageClick: (language: string) => void;
    onSubmit: (data: AddStudentProps) => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({
    form,
    studentName,
    studentClass,
    languageList,
    responseMessage,
    responseCode,
    handleLanguageClick,
    onSubmit,
}) => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = form;
    const language = watch('language');

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                width: '100%',
                height: '80vh',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'column',
                rowGap: '20px',
                padding: 3,
            }}
        >
            <Grid width={'100%'} p={0}>
                <CustomTextField {...register('penId')} placeholder='0000000000' label='Student pen id' variant='outlined' size='small' fullWidth />
                <CustomTypography sx={{ mt: 0.5, ml: 1 }} fontWeight={400} color={responseCode == 200 ? 'success' : 'error'} type='information'>
                    {responseMessage}
                </CustomTypography>
            </Grid>

            <CustomTextField value={studentName} placeholder='Student name' label='Name' variant='outlined' size='small' fullWidth />

            <Stack width={'100%'} columnGap={2} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                <CustomTextField value={studentClass} placeholder='grade' label='Grade' variant='outlined' size='small' fullWidth />
                <SelectDropDownComponent
                    helperText={errors?.section?.message || ''}
                    id='section'
                    errors={errors}
                    control={control}
                    label='Select section'
                    selectionList={sectionList}
                />
            </Stack>

            <Stack
                width={'100%'}
                columnGap={2}
                rowGap={1}
                flexWrap={'wrap'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'start'}
                alignItems={'center'}
            >
                <Typography variant='subtitle2' width={'100%'} color='grey' fontWeight={500}>
                    Select language
                </Typography>
                {languageList.map((item, key) => {
                    const isSelected = language?.includes(item.title);
                    return (
                        <CustomChip
                            size='medium'
                            key={key}
                            label={item.title}
                            color={'secondary'}
                            clickable
                            variant={isSelected ? 'filled' : 'outlined'}
                            onClick={() => handleLanguageClick(item.title)}
                        />
                    );
                })}
                {errors.language && (
                    <Typography width={'100%'} variant='caption' color='error'>
                        {errors.language.message}
                    </Typography>
                )}
            </Stack>

            <CustomButton
                startIcon={<UserRoundPlus size={20} strokeWidth={2.5} absoluteStrokeWidth />}
                type='submit'
                fullWidth
                variant='contained'
                size='large'
                color='secondary'
                sx={{ justifySelf: 'flex-end', mt: 5 }}
            >
                Add student
            </CustomButton>
        </form>
    );
};

export default AddStudentForm;
