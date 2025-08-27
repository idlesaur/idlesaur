'use client';

import { Logo, ProfileDropdown, SideNav } from '@/components';
import { GiHamburgerMenu } from 'react-icons/gi';
import React, { useState } from 'react';

export const Header: React.FC = () => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    return (
        <>
            <header className="border-background-900 bg-background-800 mb-auto flex w-full flex-col border-b py-4">
                <div className="flex flex-row gap-x-4">
                    <div
                        className="hover:bg-background-700 cursor-pointer p-2 hover:rounded-2xl"
                        onClick={() => setIsSideNavOpen(true)}
                    >
                        <GiHamburgerMenu
                            data-testid="side-nav-toggle"
                            className=""
                        />
                    </div>

                    <Logo level={4} />
                    <div className="relative mr-2 ml-auto flex flex-row gap-2">
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
