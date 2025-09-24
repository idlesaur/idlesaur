import * as z from 'zod';

export const RenameDinosaur = z.object({
    id: z.string(),
    name: z
        .string()
        .min(1, 'Must be at least 1 character.')
        .max(30, 'Max of 30 characters.')
        .trim(),
});

export type RenameDinosaurType = z.infer<typeof RenameDinosaur>;
