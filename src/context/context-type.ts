export type AuthUser = {
    name: string;
    email: string;
};

// alert type for the alert component
export type AlertProp = {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
};
