import { createContext } from 'react';
import { UserState } from '@/state/types';

export const UserStateContext = createContext<UserState | undefined>(undefined);
