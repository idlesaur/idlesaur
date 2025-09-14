import { redirect, RedirectType } from 'next/navigation';
import { auth } from '@/auth';
import { Routes } from '@/constants';
import {
    CurrencyStoreProvider,
    UpgradesStoreProvider,
    DinosaursStoreProvider,
} from '@/state/providers';
import { getAndUpdateBones } from '@/app/lib/actions';
import { ReactNode } from 'react';
import {
    createCurrencyState,
    createUpgradesState,
    createDinosaursState,
} from '@/state/stores';
import { getPlayerDinosaurs, getPlayerUpgrades } from '@/app/lib/data';

const goHome = () => {
    redirect(Routes.HOME, RedirectType.replace);
};

export default async function GameLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await auth();
    if (!session?.user) {
        goHome();
    }
    const response = await getAndUpdateBones();
    if (response === null) {
        goHome();
    }
    const { bones } = response!;

    const userId = session!.user.id;
    const upgrades = await getPlayerUpgrades({ userId });
    const dinosaurs = await getPlayerDinosaurs({ userId });

    if (upgrades === null || dinosaurs === null) {
        goHome();
    }

    return (
        <UpgradesStoreProvider initialState={createUpgradesState(upgrades!)}>
            <CurrencyStoreProvider
                initialState={createCurrencyState({ bones })}
            >
                <DinosaursStoreProvider
                    initialState={createDinosaursState({ dinosaurs })}
                >
                    {children}
                </DinosaursStoreProvider>
            </CurrencyStoreProvider>
        </UpgradesStoreProvider>
    );
}
