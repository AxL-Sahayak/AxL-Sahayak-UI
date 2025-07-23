import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Divider, Grid, IconButton } from '@mui/material';
import { CustomButton } from '../../elements/button-element';
import { UserRoundPlus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CustomTypography } from '../../elements/text-elements';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction='up' ref={ref} {...props} />;
});
interface DialogBoxProps {
    title: string;
    open: boolean;
    handleClose: (event: object, reason: 'backdropClick' | 'escapeKeyDown') => void;
    data: {
        student: unknown;
        myStudents: string[];
    };
    reset: () => void;
}
const DialogBox: React.FC<DialogBoxProps> = ({ open, handleClose, title, data, reset }) => {
    const navigateTo = useNavigate();
    // / Keys to exclude
    const excludedKeys = ['isActive', 'createdBy', '_id', 'createdAt', '__v'];

    const formatedArray =
        data?.student != null
            ? Object.entries(data.student ?? {})
                  .filter(([key]) => !excludedKeys.includes(key))
                  .map(([key, value]) => ({
                      title: key,
                      value: Array.isArray(value) ? value.join(', ') : value,
                  }))
            : [];

    return (
        <Dialog
            fullWidth
            open={open}
            slots={{
                transition: Transition,
            }}
            keepMounted
            onClose={handleClose}
            aria-describedby='alert-dialog-slide-description'
        >
            <Grid sx={{ width: '98%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <DialogTitle>{title}</DialogTitle>
                <IconButton onClick={(event) => handleClose(event, 'escapeKeyDown')}>
                    <X strokeWidth={2.25} />
                </IconButton>
            </Grid>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', rowGap: 3 }}>
                {formatedArray.map((data, index) => (
                    <Grid key={index} width={'100%'} display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'} columnGap={2}>
                        <DialogContentText id='alert-dialog-slide-description' sx={{ width: '40%' }}>
                            {data.title}
                        </DialogContentText>
                        <DialogContentText id='alert-dialog-slide-description'>: {String(data?.value)}</DialogContentText>
                    </Grid>
                ))}

                <Divider sx={{ width: '100%' }} />
                <Grid
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'row'}
                    flexWrap={'wrap'}
                    justifyContent={'flex-start'}
                    alignItems={'flex-start'}
                    columnGap={2}
                    rowGap={2}
                >
                    <CustomTypography fontWeight={500} type='subHeader' width={'100%'}>
                        My Students
                    </CustomTypography>
                    {data.myStudents.map((student, index) => (
                        <CustomTypography key={index} width={'40%'} fontWeight={500} type='content' color='secondary'>
                            {student} ,
                        </CustomTypography>
                    ))}
                </Grid>
            </DialogContent>
            <Grid
                sx={{
                    p: 2,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    rowGap: 1,
                }}
            >
                <CustomButton
                    onClick={(event) => {
                        handleClose(event, 'escapeKeyDown');
                        navigateTo('/');
                    }}
                    fullWidth
                    variant='text'
                    size='large'
                    color='primary'
                    sx={{ justifySelf: 'flex-end', mt: 5 }}
                >
                    Go back
                </CustomButton>
                <CustomButton
                    onClick={(event) => {
                        handleClose(event, 'escapeKeyDown');
                        navigateTo('.');
                        reset();
                    }}
                    startIcon={<UserRoundPlus size={20} strokeWidth={2.5} absoluteStrokeWidth />}
                    type='submit'
                    fullWidth
                    variant='contained'
                    size='large'
                    color='secondary'
                    sx={{ justifySelf: 'flex-end' }}
                >
                    Add Another student
                </CustomButton>
            </Grid>
        </Dialog>
    );
};

export default DialogBox;
