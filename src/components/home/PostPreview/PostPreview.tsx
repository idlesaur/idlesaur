import { Routes } from '@/constants';
import { Post } from '@/generated/prisma';
import { LinkButton, CardHeading, Card } from '@/components/ui';

export interface PostPreviewProps {
    post: Post;
}

export const PostPreview = ({ post }: PostPreviewProps) => {
    return (
        <Card>
            <CardHeading>{post.title}</CardHeading>
            <div>{new Date().toLocaleDateString()}</div>
            <LinkButton href={Routes.POST.replace(':id', String(post.slug))}>
                {'>'}
            </LinkButton>
        </Card>
    );
};
