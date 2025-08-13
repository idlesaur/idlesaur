import { Home as HomePageComponent } from '@/components/pages';
import { prisma } from '@/prisma';

export default async function Home() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return <HomePageComponent posts={posts} />;
}
