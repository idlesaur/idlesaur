'use client';

import Image from 'next/image';
import Link from 'next/link';

import { isNullOrWhitespace } from '@/util';
import { SignOutButton } from '@/components';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Routes } from '@/constants';

export const ProfileDropdownContent = () => {
    const session = useSession();
    const userName = session?.data?.user?.profile?.userName ?? undefined;
    const profileImage = session?.data?.user?.image ?? undefined;

    return (
        <div className="bg-background-800 absolute right-0 z-20 mt-1 w-40 rounded-lg shadow-lg">
            <div className="flex flex-1 flex-col text-sm">
                {!isNullOrWhitespace(userName) && (
                    <div className="flex flex-row gap-2 px-4 py-2">
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
                    </div>
                )}
                <Link
                    href={Routes.PROFILE}
                    className="hover:bg-background-700 w-full cursor-pointer px-4 py-2"
                >
                    Profile
                </Link>
                <div className="cursor-no-drop px-4 py-2 text-gray-500">
                    Settings
                </div>
                <div className="px-4 py-2">
                    <SignOutButton />
                </div>
            </div>
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
