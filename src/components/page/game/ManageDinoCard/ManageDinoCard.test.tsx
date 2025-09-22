import { render, screen } from '@testing-library/react';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ManageDinoCard } from '@/components/page/game';
import { mockDinosaur } from '@/test/mockFactory';

describe('<ManageDinoCard />', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly', () => {
        const name = 'test dino';
        render(<ManageDinoCard dinosaur={mockDinosaur({ name })} />);
        expect(screen.getByText(name)).toBeInTheDocument();
    });
});
