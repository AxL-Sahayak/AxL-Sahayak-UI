import { useQuery } from '@tanstack/react-query';
import { headerWithToken } from '../../utils/apiheader';

export const useGetMyCohorts = () =>
    useQuery({
        queryKey: ['getMyCohort'],
        queryFn: async () => {
            const response = await headerWithToken.get('/teacher/getMyCohorts');
            return response;
        },
    });

export interface GetMyCohortsType {
    PEN: string;
    class: string;
    name: string;
}
