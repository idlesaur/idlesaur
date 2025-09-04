import Link from 'next/link';
import { Routes } from '@/constants';
import { SignOutButton } from '@/components';

export const SideNavContentSignedIn = () => {
    return (
        <>
            <Link
                href={Routes.HOME}
                className="hover:bg-background-700 cursor-pointer px-4 py-2"
            >
                Home
            </Link>

            <Link
                href={Routes.GAME}
                className="hover:bg-background-700 cursor-pointer px-4 py-2"
            >
                Game
            </Link>

            <SignOutButton className="px-4 py-2" />
        </>
    );
};
