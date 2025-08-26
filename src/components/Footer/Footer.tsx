import { FaGithub } from 'react-icons/fa';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-background-900 border-background-800 mt-auto w-full border-t py-4">
            <div className="flex flex-col items-center justify-center gap-x-4 sm:flex-row">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} Idlesaur. All rights reserved.
                </span>
                <div className="mt-2 flex items-center gap-4 sm:mt-0">
                    <a
                        href="https://github.com/idlesaur/idlesaur"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 transition-colors hover:text-white"
                        aria-label="GitHub Repository"
                    >
                        <FaGithub size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};
