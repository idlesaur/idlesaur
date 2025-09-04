import Link from 'next/link';
import { Routes } from '@/constants';
import { SignOutButton } from '@/components';

export const SideNavContentSignedIn = () => {
    const linkClasses = 'hover:bg-background-700 cursor-pointer px-4 py-2';

    return (
        <>
            <Link href={Routes.HOME} className={linkClasses}>
                Home
            </Link>

            <Link href={Routes.GAME} className={linkClasses}>
                Game
            </Link>

            <Link href={Routes.SCORES} className={linkClasses}>
                High Scores
            </Link>

            <div className="p-3">
                <SignOutButton className="mt-3 w-full" />
            </div>
        </>
    );
};
