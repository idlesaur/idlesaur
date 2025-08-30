import { auth } from '@/auth';
import { redirect, RedirectType } from 'next/navigation';
import { Routes } from '@/constants';
import { Profile } from '@/schema';
import { getProfileByUserId } from '@/app/lib/data';
import { EditProfile } from '@/components/profile';

export type Props = object;

export default async function Page({}: Props) {
    const session = await auth();
    if (!session?.user) {
        redirect(Routes.HOME, RedirectType.replace);
    }

    const profile = await getProfileByUserId(session.user.id);
    console.log('profile', profile);

    const parsedProfile = Profile.safeParse(profile);
    console.log('parsedProfile', parsedProfile);

    if (!parsedProfile.success) {
        redirect(Routes.HOME, RedirectType.replace);
    }

    return (
        <div>
            <main>
                <EditProfile profile={parsedProfile.data} />
            </main>
        </div>
    );
}
