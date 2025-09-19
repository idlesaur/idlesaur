import { auth } from '@/auth';
import { redirect, RedirectType } from 'next/navigation';
import { Routes } from '@/constants';
import { getHighScores } from '@/app/lib/data';
import { Scores } from '@/components/page/scores';

export type Props = object;

export default async function Page({}: Props) {
    const session = await auth();
    if (!session?.user) {
        redirect(Routes.HOME, RedirectType.replace);
    }

    const scores = await getHighScores();

    return (
        <main className="flex flex-1 flex-col">
            <Scores scores={scores} />
        </main>
    );
}
