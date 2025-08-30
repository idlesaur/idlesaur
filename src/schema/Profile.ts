import * as z from 'zod';

export const Profile = z.object({
    bio: z.string(),
    userName: z.nullable(z.string()),
});

export type ProfileType = z.infer<typeof Profile>;
