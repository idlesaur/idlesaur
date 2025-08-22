import { Routes } from '@/constants';
import { Post } from '@/generated/prisma';
import { Heading, LinkButton } from '@/components/ui';

export interface PostPreviewProps {
    post: Post;
}

export const PostPreview = ({ post }: PostPreviewProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <Heading level={4}>{post.title}</Heading>
            <LinkButton href={Routes.POST.replace(':id', String(post.id))}>
                {'>'}
            </LinkButton>
        </div>
    );
};
