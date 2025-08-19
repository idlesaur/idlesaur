import { UserState } from '@/state/types';

export const createUserState = (
    defaultStateOverrides: Partial<UserState> = {},
): UserState => ({
    ...defaultStateOverrides,
});
