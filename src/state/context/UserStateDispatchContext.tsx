import React, { createContext } from 'react';
import { UserStateAction } from '@/state/actions';

export const UserStateDispatchContext = createContext<
    React.Dispatch<UserStateAction> | undefined
>(undefined);
