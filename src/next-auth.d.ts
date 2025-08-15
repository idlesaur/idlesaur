import type { SessionUser } from '@/types';

declare module 'next-auth' {
    interface Session {
        user: SessionUser;
    }

    type User = SessionUser;
}
