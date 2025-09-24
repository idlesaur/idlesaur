import * as z from 'zod';

export const Profile = z.object({
    bio: z.string(),
    public: z.boolean(),
    userName: z
        .string()
        .min(3, 'Must be at least 3 characters.')
        .max(30, 'Max of 30 characters.')
        .trim(),
});

export type ProfileType = z.infer<typeof Profile>;
