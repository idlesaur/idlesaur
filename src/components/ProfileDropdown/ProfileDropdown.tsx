'use client';

import Image from 'next/image';

import { isNullOrWhitespace } from '@/util';
import { SignOutButton } from '@/components';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

export const ProfileDropdownContent = () => {
    const session = useSession();
    const userName = session?.data?.user?.profile?.userName ?? undefined;
    const profileImage = session?.data?.user?.image ?? undefined;

    return (
        <div className="bg-background-800 absolute right-0 z-20 mt-1 w-40 rounded-lg shadow-lg">
            <ul className="flex flex-col text-sm">
                {!isNullOrWhitespace(userName) && (
                    <li className="flex flex-row gap-2 px-4 py-2">
                        {!isNullOrWhitespace(profileImage) && (
                            <Image
                                src={profileImage!}
                                className="rounded-2xl"
                                alt="Profile Image"
                                width={32}
                                height={32}
                            />
                        )}
                        {userName}
                    </li>
                )}
                <li className="hover:bg-background-700 cursor-pointer px-4 py-2">
                    Profile
                </li>
                <li className="hover:bg-background-700 cursor-pointer px-4 py-2">
                    Settings
                </li>
                <li className="px-4 py-2">
                    <SignOutButton />
                </li>
            </ul>
        </div>
    );
};

export const ProfileDropdown = () => {
    const session = useSession();
    const profileImage = session?.data?.user?.image ?? undefined;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="" ref={dropdownRef}>
            {!isNullOrWhitespace(profileImage) && (
                <Image
                    src={profileImage!}
                    className="cursor-pointer rounded-2xl"
                    alt="Profile Image"
                    width={32}
                    height={32}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                />
            )}
            {isDropdownOpen && <ProfileDropdownContent />}
        </div>
    );
};
