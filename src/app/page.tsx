import { prisma } from '@/prisma';
import { Heading, LinkButton } from '@/components/ui';
import { SignInButton, SignOutButton } from '@/components';
import { Routes } from '@/constants';
import { PostPreview } from '@/components';
import { Post } from '@/generated/prisma';
import { auth } from '@/auth';

export default async function Home() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    });
    const session = await auth();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3">
            <Heading>Idlesaur</Heading>
            {!session && <SignInButton />}
            {session && (
                <>
                    <div>
                        Signed in as:{' '}
                        {session?.user?.profile?.userName ??
                            session?.user?.name}
                    </div>
                    <SignOutButton />
                    <LinkButton href={Routes.GAME}>Play</LinkButton>
                </>
            )}

            <div className="mt-40 flex flex-col items-center justify-center gap-3">
                <Heading level={2}>News</Heading>
                <div className="flex flex-row items-center justify-start gap-3">
                    {posts.map((post: Post) => (
                        <PostPreview post={post} key={post.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}
