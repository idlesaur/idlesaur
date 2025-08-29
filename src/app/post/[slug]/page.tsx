import { Card, CardHeading } from '@/components/ui';
import { getPostBySlug } from '@/app/lib/data';

export type Props = {
    params: Promise<{ slug: string }>;
};

// https://nextjs.org/docs/app/getting-started/metadata-and-og-images#generated-metadata
export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    return {
        title: post?.title,
        description: post?.content,
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

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
