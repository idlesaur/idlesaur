import { prisma } from '@/prisma';
import { LinkButton } from '@/components/ui';
import { StyledHeading, SignInButton, SignOutButton, Logo } from '@/components';
import { Routes } from '@/constants';
import { PostPreview } from '@/components/home';
import { Post } from '@/generated/prisma';
import { auth } from '@/auth';

export default async function Home() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        take: 3,
    });
    const session = await auth();

    return (
        <div className="flex flex-1 flex-col">
            <main className="flex flex-1 flex-col items-center justify-center gap-4">
                <Logo>Idlesaur</Logo>
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

                <div className="mt-40 flex w-screen flex-col items-center gap-3">
                    <div className="flex flex-row justify-between gap-10">
                        <StyledHeading level={2}>Latest News</StyledHeading>
                        <StyledHeading level={4}>View All News</StyledHeading>
                    </div>
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
