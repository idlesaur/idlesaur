import { prisma } from '@/prisma';

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
        where: { slug },
    });

    if (!post) {
        return (
            <div>
                <main>
                    <h1>Post Not Found</h1>
                </main>
            </div>
        );
    }

    return (
        <div>
            <main>
                <h1>{post.title}</h1>
            </main>
        </div>
    );
}
