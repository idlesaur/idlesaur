'use client';

import { MdOutlineClose } from 'react-icons/md';

import { SignOutButton } from '@/components';
import { useEffect, useState } from 'react';

export interface SideNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SideNav = ({ isOpen, onClose }: SideNavProps) => {
    const [shouldRender, setShouldRender] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        } else {
            // Wait for animations to finish before unmounting
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    return (
        <>
            {/* Overlay with fade animation */}
            <div
                className={`fixed inset-0 z-40 transition-opacity duration-300 ${
                    isOpen ? 'bg-black/50' : 'bg-black/0'
                }`}
                onClick={onClose}
            />

            {/* Slide-out panel */}
            <div
                className={`bg-background-800 fixed top-0 left-0 z-50 h-full w-full transform shadow-lg transition-transform duration-300 lg:w-64 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="border-background-700 flex flex-row border-b p-4 text-lg font-bold">
                    Navigation
                    <div className="ml-auto cursor-pointer">
                        <MdOutlineClose onClick={onClose} />
                    </div>
                </div>
                <ul className="flex flex-col">
                    <li className="hover:bg-background-700 cursor-pointer px-4 py-2">
                        Dashboard
                    </li>
                    <li className="hover:bg-background-700 cursor-pointer px-4 py-2">
                        Inventory
                    </li>
                    <li className="hover:bg-background-700 cursor-pointer px-4 py-2">
                        Settings
                    </li>
                    <li className="px-4 py-2">
                        <SignOutButton />
                    </li>
                </ul>
            </div>
        </>
    );
};
