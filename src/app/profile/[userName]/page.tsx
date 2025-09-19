import { getProfileByUserId, getPublicProfileByUserName } from '@/app/lib/data';
import { PublicProfile } from '@/components/page/profile';
import { TbFileSad } from 'react-icons/tb';
import { auth } from '@/auth';

export async function generateMetadata({ params }: Props) {
    const { userName } = await params;
    const profile = await getPublicProfileByUserName(userName);

    const isProfileAvailable = profile?.public;

    return {
        title: isProfileAvailable
            ? `Idlesaur - ${profile.userName}'s profile`
            : 'Idlesaur - Profile not found',
        description: 'Idlesaur - Profile Page',
    };
}

export type Props = {
    params: Promise<{ userName: string }>;
};

export default async function Page({ params }: Props) {
    const { userName } = await params;
    const session = await auth();

    if (!session?.user?.id) {
        return null;
    }

    const ownProfile = await getProfileByUserId(session.user.id);
    const isOwnProfile = userName === ownProfile?.userName;

    const profile = await getPublicProfileByUserName(userName, isOwnProfile);
    const currency = profile?.user?.currency ?? undefined;

    return (
        <main className="flex flex-1 flex-col">
            {!profile || isOwnProfile || (profile && profile.public) ? (
                <PublicProfile
                    profile={profile!}
                    currency={currency}
                    isOwnProfile={isOwnProfile}
                />
            ) : (
                <div className="flex flex-col items-center">
                    <TbFileSad size={64} />
                    <div>Profile not found.</div>
                </div>
            )}
        </main>
    );
}
