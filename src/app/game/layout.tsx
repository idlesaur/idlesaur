import { redirect, RedirectType } from 'next/navigation';
import { auth } from '@/auth';
import { Routes } from '@/constants';
import {
    CurrencyStoreProvider,
    UpgradesStoreProvider,
} from '@/state/providers';
import { getAndUpdateBones } from '@/app/lib/actions';
import { ReactNode } from 'react';

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

    // const { bones } = response;
    // const boneDiggers = session?.user?.upgrades?.boneDiggers ?? undefined;

    return (
        <UpgradesStoreProvider>
            <CurrencyStoreProvider>{children}</CurrencyStoreProvider>
        </UpgradesStoreProvider>
    );
}
