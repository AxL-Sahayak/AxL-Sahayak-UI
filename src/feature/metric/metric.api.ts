import { useQuery } from '@tanstack/react-query';
import { headerWithToken } from '../../utils/apiheader';

export const useGetMetricsByCohortId = (cohortId: string) =>
    useQuery({
        queryKey: ['getmetricbycohortid', cohortId],
        queryFn: async () => {
            const response = await headerWithToken.get(`/teacher/getMetricsByCohort?cohortId=${cohortId}`);
            return response;
        },
    });

export interface GetMetricsByCohortIdType {
    id: string;
    metricType: string;
    title: string;
    value: string;
    actualValue: string | number;
    targetValue: string | number;
    status: string;
    message: string;
    studentList: {
        name: string;
        status: string;
    }[];
}
