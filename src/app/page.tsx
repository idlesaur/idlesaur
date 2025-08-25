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
        <div className="flex flex-1 flex-col">
            <main className="flex flex-1 flex-col items-center justify-center gap-3 px-4">
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
                    <div className="flex max-w-full flex-row flex-wrap items-center justify-center gap-3">
                        {posts.map((post: Post) => (
                            <PostPreview post={post} key={post.id} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
