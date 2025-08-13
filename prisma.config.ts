import 'dotenv/config';
import { PrismaConfig } from 'prisma';

export default {
    migrations: {
        seed: `tsx prisma/seed.ts`,
    },
} satisfies PrismaConfig;
