import { redirect, RedirectType } from 'next/navigation';
import { auth } from '@/auth';
import { Routes } from '@/constants';
import { GameStateProvider } from '@/state/providers';
import { getAndUpdateBones } from '@/app/actions';
import { ReactNode } from 'react';

export default async function GameLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await auth();
    if (!session) {
        redirect(Routes.HOME, RedirectType.replace);
    }
    const response = await getAndUpdateBones();
    if (!response) {
        redirect(Routes.HOME, RedirectType.replace);
    }

    const { bones } = response;
    const boneDiggers = session?.user?.upgrades?.boneDiggers ?? undefined;

    return (
        <GameStateProvider initialState={{ bones, boneDiggers }}>
            {children}
        </GameStateProvider>
    );
}
