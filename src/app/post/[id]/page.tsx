import { prisma } from '@/prisma';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const post = await prisma.post.findUnique({
        where: { id: Number(id) },
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
