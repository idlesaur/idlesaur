import { Game as GamePageComponent } from '@/components/pages';
import { redirect, RedirectType } from 'next/navigation';
import { auth } from '@/auth';
import { Routes } from '@/constants';

export default async function Game() {
    const session = await auth();
    if (!session) {
        redirect(Routes.HOME, RedirectType.replace);
    }

    return <GamePageComponent />;
}
