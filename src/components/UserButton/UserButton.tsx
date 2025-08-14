import { SignInButton, SignOutButton } from '@/components';

export interface UserButtonProps {
    isLoggedIn: boolean;
    name?: string;
}

export const UserButton = ({ isLoggedIn, name }: UserButtonProps) => {
    if (!isLoggedIn) return <SignInButton />;
    return (
        <div className="flex items-center gap-2">
            <span className="hidden text-sm sm:inline-flex">{name}</span>
            <SignOutButton />
        </div>
    );
};
