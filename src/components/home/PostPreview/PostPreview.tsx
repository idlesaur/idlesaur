import { GiDinosaurRex } from 'react-icons/gi';

import { Routes } from '@/constants';
import { Post } from '@/generated/prisma';
import { LinkButton, CardHeading, Card } from '@/components/ui';

export interface PostPreviewProps {
    post: Post;
}

export const PostPreview = ({ post }: PostPreviewProps) => {
    const link = Routes.POST.replace(':id', String(post.slug));
    return (
        <LinkButton href={link} className="w-80 p-1">
            <Card>
                <div className="bg-background-800 flex w-full justify-center p-3">
                    <GiDinosaurRex size={64} />
                </div>

                <CardHeading>{post.title}</CardHeading>
                <div className="text-sm">
                    {post.createdAt.toLocaleDateString()}
                </div>
            </Card>
        </LinkButton>
    );
};
