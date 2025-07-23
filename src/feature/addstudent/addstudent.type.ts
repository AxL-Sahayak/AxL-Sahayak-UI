import * as yup from 'yup';

export interface AddStudentProps {
    penId: string;
    section: {
        id: string;
        title: string;
    };
    language: string[];
}

export const sectionList = [
    { id: '1', title: 'A' },
    { id: '2', title: 'B' },
    { id: '3', title: 'C' },
    { id: '4', title: 'D' },
    { id: '5', title: 'E' },
    { id: '6', title: 'F' },
];

// Validation schema with regex
export const addStudentSchema = yup.object().shape({
    penId: yup.string().trim().required('Pen ID is required'),
    section: yup
        .object({
            id: yup.string().required(),
            title: yup.string().required(),
        })
        .required('Please select a section'),
    language: yup.array().of(yup.string()).min(1, 'Please select at least one language').required('Please select at least one language'),
});
