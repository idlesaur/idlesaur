import { Game as GamePageComponent } from '@/components/pages';
import { redirect, RedirectType } from 'next/navigation';
import { auth } from '@/auth';
import { Routes } from '@/constants';
import { GameStateProvider } from '@/state/providers';
import { getAndUpdateBones } from '@/app/actions';

export default async function Game() {
    const session = await auth();
    if (!session) {
        redirect(Routes.HOME, RedirectType.replace);
    }
    const response = await getAndUpdateBones();
    if (!response) {
        redirect(Routes.HOME, RedirectType.replace);
    }

    const { bones } = response;
    const boneDiggers = session?.user?.upgrades?.boneDiggers ?? 0;

    return (
        <GameStateProvider initialState={{ bones, boneDiggers }}>
            <GamePageComponent />
        </GameStateProvider>
    );
}
