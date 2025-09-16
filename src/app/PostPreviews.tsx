import { prisma } from '@/prisma';
import { PostPreview } from '@/components/page/home';
import { type Post } from '@/generated/prisma';

export default async function PostPreviews() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        take: 3,
    });

    return posts.map((post: Post) => <PostPreview post={post} key={post.id} />);
}
