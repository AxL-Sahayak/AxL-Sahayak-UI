import { useQuery } from '@tanstack/react-query';
import { headerWithToken } from '../../utils/apiheader';

export const useGetMetricDetailsByMetricId = (cohortId: string, metricId: string) =>
    useQuery({
        queryKey: ['getMetricByMetricId', cohortId],
        queryFn: async () => {
            const response = await headerWithToken.get(`/teacher/getMetricDetails?cohortId=${cohortId}&metricId=${metricId}`);
            return response;
        },
    });

export interface GetMetricsDetailsByMetricIdType {
    name: string;
    actual: number;
    target: number;
    status: number;
}
