import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

export const withSessionState =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,react/display-name
    (session?: Session) => (Story: any) => (
        <SessionProvider session={session}>
            <Story />
        </SessionProvider>
    );

export const withMockedSessionState =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,react/display-name
    () => (Story: any) => (
        <SessionProvider
            session={
                {
                    user: {
                        id: '123',
                        name: 'testuser',
                        userName: 'test',
                        image: 'asdf.png',
                        email: 'test@user.com',
                    },
                } as Session
            }
        >
            <Story />
        </SessionProvider>
    );
