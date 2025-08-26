'use client';

import { Logo, ProfileDropdown } from '@/components';
import { GiHamburgerMenu } from 'react-icons/gi';
import React, { useState } from 'react';
import { SideNav } from '@/components/game';

export const Header: React.FC = () => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    return (
        <>
            <header className="border-background-900 bg-background-800 mb-auto flex w-full flex-col border-b py-4">
                <div className="flex flex-row gap-x-4">
                    <GiHamburgerMenu
                        data-testid="side-nav-toggle"
                        className="hover:bg-background-700 cursor-pointer"
                        onClick={() => setIsSideNavOpen(true)}
                    />
                    <Logo level={4} />
                    <div className="relative ml-auto flex flex-row gap-2">
                        <ProfileDropdown />
                    </div>
                </div>
            </header>
            <SideNav
                isOpen={isSideNavOpen}
                onClose={() => setIsSideNavOpen(false)}
            />
        </>
    );
};
