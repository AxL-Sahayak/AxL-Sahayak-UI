import { Card, Divider, Stack } from '@mui/material';
import { CustomTypography } from '../../elements/text-elements';
// import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { CustomButton, CustomChip } from '../../elements/button-element';

interface StudentReviewCardProps {
    studentsList?: string[];
    detailText?: string;
    metric?: string;
}

const StudentReviewCard: React.FC<StudentReviewCardProps> = ({ studentsList, detailText, metric }) => {
    return (
        <Card
            component={'div'}
            sx={{
                width: { md: 400, xs: '100%', minHeight: '140px' },
                p: 1,
                borderRadius: 3,
                backgroundColor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'center',
                boxShadow: 3,
                cursor: 'pointer',
            }}
        >
            <CustomTypography type='cardHeader' color='primary' fontWeight={800}>
                {metric}
            </CustomTypography>
            {/* <Stack direction={'row'} columnGap={1} alignSelf={'end'}>
                <StarRoundedIcon color='success' /> <StarRoundedIcon color='success' /> <StarRoundedIcon color='success' />{' '}
                <StarRoundedIcon color='success' />
            </Stack> */}
            <Divider sx={{ width: '100%', my: 1 }} />
            <Stack direction={'row'} rowGap={1} columnGap={1} alignSelf={'start'} flexWrap={'wrap'} py={2}>
                {studentsList?.map((name, index) => (
                    <CustomChip key={index} label={name} clickable color='warning' variant={'outlined'} size='small' />
                ))}
            </Stack>
            <CustomTypography>{detailText}</CustomTypography>

            <CustomButton size='small' sx={{ alignSelf: 'end' }} variant='contained'>
                View details
            </CustomButton>
        </Card>
    );
};

export default StudentReviewCard;
