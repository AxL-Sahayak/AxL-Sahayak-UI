export interface ApiResponse<T> {
    responseObj: {
        responseId: string;
        responseTs: string;
        responseApiVersion: string;
        responseCode: number;
        responseMessage: string;
        responseDataParams: {
            data: T;
        };
    };
}
