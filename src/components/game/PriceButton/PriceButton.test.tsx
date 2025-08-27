import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DiCode } from 'react-icons/di';

import { PriceButton } from '@/components/game';

describe('PriceButton', () => {
    it('renders with icon and price', () => {
        render(<PriceButton icon={<DiCode />} text="Click Me" price={42} />);
        expect(
            screen.getByRole('button', { name: '42 Click Me' }),
        ).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', async () => {
        const handleClick = vi.fn();
        render(
            <PriceButton
                icon={<DiCode />}
                text="Click"
                onClick={handleClick}
            />,
        );
        const btn = screen.getByRole('button', { name: 'Click' });
        await userEvent.click(btn);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
