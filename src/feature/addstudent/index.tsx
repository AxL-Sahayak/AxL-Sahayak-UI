import { Grid } from '@mui/material';
import { CustomTypography } from '../../elements/text-elements';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AddStudentProps, addStudentSchema } from './addstudent.type';
import { addStudentApi, GetStudentDetailByPenIdResponseType, useGetAllLanguagesList, useGetStudentDetailByPenId } from './addstudent.api';
import { ApiResponse } from '../../utils/apiresponsetype';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useContext, useState } from 'react';
import { Context, ContextTypes } from '../../context/context';
import CustomLoader from '../../components/loader';
import DialogBox from '../../components/dialog';
import AddStudentForm from './addstudentform';

const AddStudentScreen = () => {
    const context = useContext(Context);
    const { setAlert } = context as ContextTypes;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm({
        resolver: yupResolver(addStudentSchema),
        defaultValues: {
            language: [],
            penId: '',
            section: {
                id: '',
                title: '',
            },
        },
    });

    const handleLanguageClick = (languageProps: string) => {
        const current = language || [];
        const exists = current.includes(languageProps);
        const updated = exists ? current.filter((l) => l !== languageProps) : [...current, languageProps];
        setValue('language', updated, { shouldValidate: true });
    };
    const language = watch('language');
    const valueOfPenId = watch('penId').length === 9 ? watch('penId') : '';

    const { data } = useGetStudentDetailByPenId(valueOfPenId);
    const studentDetail: ApiResponse<GetStudentDetailByPenIdResponseType> = data?.data?.responseObj?.responseDataParams?.data;
    const { class: studentClass = '', name: studentName = '' } = studentDetail || {};
    const responseMessage =
        data?.data?.responseObj?.responseMessage == 'PEN is required' && watch('penId').length === 0
            ? 'Enter pen id to get student detail'
            : data?.data?.responseObj?.responseMessage == 'PEN is required' && watch('penId').length > 0
              ? 'Pen id should contain 9 digits'
              : data?.data?.responseObj?.responseMessage;
    const responseCode = data?.data?.responseObj?.responseCode;

    const { data: LanguageListData } = useGetAllLanguagesList();

    type DialogOpenType = {
        open: boolean;
        data: { student: unknown; myStudents: string[] } | null;
    };
    const [dialogOpen, setDialogOpen] = useState<DialogOpenType | null>({ open: false, data: { student: null, myStudents: [] } });
    interface LanguageListType {
        id: string;
        title: string;
    }
    const LanguageList: LanguageListType[] = LanguageListData?.data?.responseObj?.responseDataParams?.data || [];
    const onSubmit = (data: AddStudentProps) => {
        mutate(data);
    };

    const { mutate, isPending } = useMutation({
        mutationFn: (data: AddStudentProps) => {
            return addStudentApi(data);
        },
        onSuccess: (response: AxiosResponse<ApiResponse<unknown>>) => {
            if (response?.data?.responseObj?.responseCode === 200) {
                setDialogOpen({
                    open: true,
                    data: response?.data?.responseObj?.responseDataParams?.data,
                });
                setAlert({
                    open: false,
                    severity: 'success',
                    message: response?.data?.responseObj?.responseMessage,
                });
            } else {
                setAlert({
                    open: true,
                    severity: 'warning',
                    message: response?.data?.responseObj?.responseMessage,
                });
            }
        },
        onError: (error: unknown) => {
            setAlert({
                open: true,
                severity: 'error',
                message: 'Something went wrong...!',
            });
            return error;
        },
    });
    return (
        <Grid width={'100%'} justifyContent={'flex-start'} alignItems={'flex-start'} display={'flex'} rowGap={2} flexDirection={'column'}>
            <CustomTypography textTransform={'capitalize'} type='subHeader' fontWeight={600}>
                Add student
            </CustomTypography>
            <CustomLoader open={isPending} />
            <AddStudentForm
                form={{ register, handleSubmit, control, formState: { errors }, setValue, watch }}
                studentName={studentName}
                studentClass={studentClass}
                languageList={LanguageList}
                responseMessage={responseMessage}
                responseCode={responseCode}
                isPending={isPending}
                handleLanguageClick={handleLanguageClick}
                onSubmit={onSubmit}
            />
            <DialogBox
                reset={reset}
                title='Student Summary'
                open={dialogOpen?.open ?? false}
                data={dialogOpen?.data}
                handleClose={() => {
                    setDialogOpen({ open: false, data: dialogOpen?.data || null });
                }}
            />
        </Grid>
    );
};

export default AddStudentScreen;
