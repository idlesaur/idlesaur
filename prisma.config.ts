import 'dotenv/config';
import { PrismaConfig } from 'prisma';
import path from 'node:path';

export default {
    migrations: {
        seed: `tsx prisma/seed.ts`,
    },
    schema: path.join('prisma'),
} satisfies PrismaConfig;
