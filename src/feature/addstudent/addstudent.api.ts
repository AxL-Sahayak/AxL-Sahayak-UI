import { useQuery } from '@tanstack/react-query';
import { headerWithToken } from '../../utils/apiheader';
import { AddStudentProps } from './addstudent.type';

export const useGetStudentDetailByPenId = (penId: string) =>
    useQuery({
        queryKey: ['getPenid', penId],
        queryFn: async () => {
            const response = await headerWithToken.get(`/teacher/getStudentByPEN?pen=${penId}`);
            return response;
        },
    });

export interface GetStudentDetailByPenIdResponseType {
    PEN: string;
    class: string;
    name: string;
}

export const addStudentApi = async (data: AddStudentProps) => {
    const payload = { ...data, section: data.section.title };
    const response = await headerWithToken.post('/teacher/addSingleStudent', payload);
    return response;
};

export const useGetAllLanguagesList = () =>
    useQuery({
        queryKey: ['getAllLanguages'],
        queryFn: async () => {
            const response = await headerWithToken.get('/teacher/getAllLanguages');
            return response;
        },
    });
