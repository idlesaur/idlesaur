import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Header } from './Header';

describe('Footer', () => {
    it('renders the current year', () => {
        render(<Header />);
        const year = new Date().getFullYear().toString();
        expect(screen.getByText(new RegExp(year, 'i'))).toBeInTheDocument();
    });

    it('contains GitHub link with correct href', () => {
        render(<Header />);
        const githubLink = screen.getByRole('link', {
            name: /GitHub Repository/i,
        });
        expect(githubLink).toHaveAttribute(
            'href',
            'https://github.com/idlesaur/idlesaur',
        );
        expect(githubLink).toHaveAttribute('target', '_blank');
        expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders the GitHub icon', () => {
        render(<Header />);
        const githubIcon = screen
            .getByLabelText(/GitHub Repository/i)
            .querySelector('svg');
        expect(githubIcon).toBeInTheDocument();
    });
});
