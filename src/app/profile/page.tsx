import { auth } from '@/auth';
import { redirect, RedirectType } from 'next/navigation';
import { Routes } from '@/constants';
import { ProfileType } from '@/schema';
import { getProfileByUserId } from '@/app/lib/data';
import { EditProfile } from '@/components/page/profile';

export type Props = object;

export default async function Page({}: Props) {
    const session = await auth();
    if (!session?.user) {
        redirect(Routes.HOME, RedirectType.replace);
    }

    const profile = await getProfileByUserId(session.user.id);

    return (
        <main className="flex flex-1 flex-col">
            <EditProfile profile={profile as ProfileType} />
        </main>
    );
}
