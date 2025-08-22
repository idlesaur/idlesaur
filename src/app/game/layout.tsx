import { redirect, RedirectType } from 'next/navigation';
import { auth } from '@/auth';
import { Routes } from '@/constants';
import { GameStateProvider, UserStateProvider } from '@/state/providers';
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
    const userName = session?.user?.profile?.userName ?? undefined;
    const profileImage = session?.user?.image ?? undefined;

    return (
        <GameStateProvider initialState={{ bones, boneDiggers }}>
            <UserStateProvider initialState={{ userName, profileImage }}>
                {children}
            </UserStateProvider>
        </GameStateProvider>
    );
}
