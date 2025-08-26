import Link from 'next/link';
import { Routes } from '@/constants';
import { SignOutButton } from '@/components';

export const SideNavContentSignedIn = () => {
    return (
        <>
            <li className="hover:bg-background-700 cursor-pointer px-4 py-2">
                <Link href={Routes.HOME}>Home</Link>
            </li>
            <li className="hover:bg-background-700 cursor-pointer px-4 py-2">
                <Link href={Routes.GAME}>Game</Link>
            </li>
            <li className="px-4 py-2">
                <SignOutButton />
            </li>
        </>
    );
};
