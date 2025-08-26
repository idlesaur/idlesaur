import { prisma } from '@/prisma';
import { Card, CardHeading } from '@/components/ui';

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
                <Card className="items-start">
                    <CardHeading>{post.title}</CardHeading>
                    <div>{post.createdAt.toLocaleDateString()}</div>
                    <div>{post.content}</div>
                </Card>
            </main>
        </div>
    );
}
