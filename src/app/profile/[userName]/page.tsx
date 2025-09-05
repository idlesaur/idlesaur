import { ProfileType } from '@/schema';
import { getPublicProfileByUserName } from '@/app/lib/data';
import { PublicProfile } from '@/components/page/profile';
import { TbFileSad } from 'react-icons/tb';

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
    const profile = await getPublicProfileByUserName(userName);

    return (
        <div>
            <main>
                {profile ? (
                    <PublicProfile profile={profile as ProfileType} />
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
