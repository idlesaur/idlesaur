import { ProfileType } from '@/schema';
import { getPublicProfileByUserName } from '@/app/lib/data';
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
    const isOwnProfile = userName === session?.user?.profile?.userName;

    const profileInfo = await getPublicProfileByUserName(
        userName,
        isOwnProfile,
    );

    const profile: ProfileType = {
        userName: profileInfo?.userName ?? '',
        public: profileInfo?.public ?? false,
        bio: profileInfo?.bio ?? '',
    };
    const currency = profileInfo?.user?.currency ?? undefined;

    return (
        <div>
            <main>
                {isOwnProfile || (profile && profile.public) ? (
                    <PublicProfile
                        profile={profile}
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
        </div>
    );
}
