'use client';

import { Post } from '@/generated/prisma';
import { Routes } from '@/constants';
import { LinkButton, Heading } from '@/components/ui';

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

export interface HomePageComponentProps {
    posts: Post[];
}

export const Home = ({ posts }: HomePageComponentProps) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3">
            <Heading>Idle Game</Heading>
            <LinkButton href={Routes.GAME}>Play</LinkButton>
            <div className="mt-40 flex flex-col items-center justify-center gap-3">
                <Heading level={2}>News</Heading>
                <div className="flex flex-row items-center justify-start gap-3">
                    {posts.map((post: Post) => (
                        <PostPreview post={post} key={post.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};
