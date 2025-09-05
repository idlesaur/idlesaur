import * as z from 'zod';

export const Profile = z.object({
    bio: z.string(),
    public: z.boolean(),
    userName: z.string().min(3).max(30).trim(),
});

export type ProfileType = z.infer<typeof Profile>;
