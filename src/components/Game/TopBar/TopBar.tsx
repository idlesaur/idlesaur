'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi';
import { PiBone } from 'react-icons/pi';

import { formatNumber, isNullOrWhitespace } from '@/util';
import { SignOutButton } from '@/components';
import { SideNav } from '@/components/Game';
import { useGameState } from '@/state/hooks';
import { useUserState } from '@/state/hooks/useUserState';

interface ResourceDisplayProps {
    value: number;
    children: React.ReactElement;
}

const ResourceDisplay = ({ value, children }: ResourceDisplayProps) => {
    return (
        <div className="bg-background-700 flex flex-row items-center rounded-2xl pr-3">
            <div className="bg-background-800 rounded-2xl p-1">{children}</div>
            <span className="pl-1">{formatNumber(value)}</span>
        </div>
    );
};

const ProfileDropdown = () => {
    const { userName, profileImage } = useUserState();
    return (
        <div className="bg-background-800 absolute right-0 mt-8 w-40 rounded-lg shadow-lg">
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

export const TopBar = () => {
    const { bones } = useGameState();
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const { profileImage } = useUserState();
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
        <div
            className="bg-background-900 sticky top-0 flex h-8 w-full flex-row items-center gap-3 p-1"
            data-testid="top-bar"
        >
            <GiHamburgerMenu
                className="cursor-pointer"
                onClick={() => setIsSideNavOpen(true)}
            />
            <ResourceDisplay value={bones}>
                <PiBone />
            </ResourceDisplay>
            <div
                className="relative ml-auto flex flex-row gap-2"
                ref={dropdownRef}
            >
                {!isNullOrWhitespace(profileImage) && (
                    <Image
                        src={profileImage!}
                        className="cursor-pointer rounded-2xl"
                        alt="Profile Image"
                        width={24}
                        height={24}
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                    />
                )}
                {isDropdownOpen && <ProfileDropdown />}
            </div>
            <SideNav
                isOpen={isSideNavOpen}
                onClose={() => setIsSideNavOpen(false)}
            />
        </div>
    );
};
