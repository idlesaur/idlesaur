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
import { getPlayerDinosaurs } from '@/app/lib/data';

export default async function GameLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await auth();
    if (!session?.user) {
        redirect(Routes.HOME, RedirectType.replace);
    }
    const response = await getAndUpdateBones();
    if (!response) {
        redirect(Routes.HOME, RedirectType.replace);
    }
    const { bones } = response;
    const boneDiggers = session?.user?.upgrades?.boneDiggers ?? undefined;

    const dinosaurs = await getPlayerDinosaurs({ userId: session!.user.id });

    return (
        <UpgradesStoreProvider
            initialState={createUpgradesState({ boneDiggers })}
        >
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
