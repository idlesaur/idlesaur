import React, { ReactNode } from 'react';
import {
    render as testingLibRender,
    RenderOptions,
} from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

import { GameStateProvider } from '@/state/providers';

export interface WrapperOptions {
    session?: Session;
}

const createWrapper = ({ session }: WrapperOptions) => {
    // eslint-disable-next-line react/display-name
    return ({ children }: { children: React.ReactNode }): ReactNode => (
        <SessionProvider session={session ?? null}>
            <GameStateProvider>{children}</GameStateProvider>
        </SessionProvider>
    );
};

export const getRender = ({ session }: WrapperOptions = {}) => {
    const wrapper = createWrapper({ session });
    return (ui: React.ReactNode, options?: Partial<RenderOptions>) =>
        testingLibRender(ui, { wrapper, ...options });
};

export const render = getRender();
