import { ProfileType } from '@/schema';
import { getPublicProfileByUserName } from '@/app/lib/data';
import { PublicProfile } from '@/components/page/profile';
import { TbFileSad } from 'react-icons/tb';

// export async function generateMetadata({ params }: Props) {
//     const { slug } = await params;
//     const post = await getPostBySlug(slug);
//
//     return {
//         title: post?.title,
//         description: post?.content,
//     };
// }

export type Props = {
    params: Promise<{ userName: string }>;
};

export default async function Page({ params }: Props) {
    const { userName } = await params;
    console.log('userName', userName);

    const profile = await getPublicProfileByUserName(userName);
    console.log('profile', profile);

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
