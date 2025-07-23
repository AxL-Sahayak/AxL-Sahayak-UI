import React, { createContext } from 'react';
import { AlertProp } from './context-type';

export type ContextTypes = {
    alert: AlertProp | null;
    setAlert: React.Dispatch<React.SetStateAction<AlertProp | null>>;
};

export const Context = createContext<ContextTypes | undefined>(undefined);
