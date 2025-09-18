import React, { ReactNode } from 'react';
import {
    render as testingLibRender,
    RenderOptions,
} from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

import {
    CurrencyStoreProvider,
    DinosaursStoreProvider,
    ToastsStoreProvider,
    UpgradesStoreProvider,
} from '@/state/providers';

import {
    createCurrencyState,
    createDinosaursState,
    createUpgradesState,
    CurrencyState,
    DinosaursState,
    UpgradesState,
} from '@/state/stores';

export interface WrapperOptions {
    session?: Session;
    upgradesState?: Partial<UpgradesState>;
    currencyState?: Partial<CurrencyState>;
    dinosaurState?: Partial<DinosaursState>;
}

const createWrapper = ({
    session,
    upgradesState,
    currencyState,
    dinosaurState,
}: WrapperOptions) => {
    // eslint-disable-next-line react/display-name
    return ({ children }: { children: React.ReactNode }): ReactNode => (
        <SessionProvider session={session ?? null}>
            <DinosaursStoreProvider
                initialState={createDinosaursState(dinosaurState)}
            >
                <UpgradesStoreProvider
                    initialState={createUpgradesState(upgradesState)}
                >
                    <CurrencyStoreProvider
                        initialState={createCurrencyState(currencyState)}
                    >
                        <ToastsStoreProvider>{children}</ToastsStoreProvider>
                    </CurrencyStoreProvider>
                </UpgradesStoreProvider>
            </DinosaursStoreProvider>
        </SessionProvider>
    );
};

export const getRender = (wrapperOptions: WrapperOptions = {}) => {
    const wrapper = createWrapper(wrapperOptions);
    return (ui: React.ReactNode, options?: Partial<RenderOptions>) =>
        testingLibRender(ui, { wrapper, ...options });
};

export const render = getRender();

export const mockedDate = new Date(1757023227815);
