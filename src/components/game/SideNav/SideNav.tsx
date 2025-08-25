'use client';

import { MdOutlineClose } from 'react-icons/md';
import { SignOutButton } from '@/components';

export interface SideNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SideNav = ({ isOpen, onClose }: SideNavProps) => {
    return (
        <>
            <div
                data-testid="overlay"
                className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
                    isOpen
                        ? 'pointer-events-auto opacity-50'
                        : 'pointer-events-none opacity-0'
                }`}
                onClick={onClose}
            />

            <div
                className={`bg-background-800 fixed top-0 left-0 z-50 h-full w-full shadow-lg transition-transform duration-300 lg:w-64 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="border-background-700 flex flex-row border-b p-4 text-lg font-bold">
                    Navigation
                    <div className="hover:bg-background-700 ml-auto flex cursor-pointer items-center p-1">
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
