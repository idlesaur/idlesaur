import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GameCard } from './GameCard';

describe('GameCard', () => {
    it('renders correctly', () => {
        render(
            <GameCard icon={<span>icon</span>} title="test title">
                GameCard Test
            </GameCard>,
        );
        expect(screen.getByText('icon')).toBeInTheDocument();
        expect(screen.getByText('GameCard Test')).toBeInTheDocument();
    });
});
