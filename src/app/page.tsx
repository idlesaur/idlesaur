import { prisma } from '@/prisma';
import { LinkButton } from '@/components/ui';
import { StyledHeading, SignInButton, Logo } from '@/components';
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
            <main className="mt-4 flex flex-1 flex-col items-center justify-center gap-4">
                <Logo />
                {!session && <SignInButton />}
                {session && (
                    <>
                        <LinkButton href={Routes.GAME}>Play</LinkButton>
                    </>
                )}

                <div className="mt-3 flex flex-col items-center gap-3 sm:mt-40">
                    <div className="flex w-full flex-1 flex-col items-center text-center sm:flex-row sm:items-start sm:gap-10">
                        <StyledHeading level={2}>Latest News</StyledHeading>
                        <StyledHeading level={4}>View All News</StyledHeading>
                    </div>
                    <div className="mb-4 flex max-w-full flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
                        {posts.map((post: Post) => (
                            <PostPreview post={post} key={post.id} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
