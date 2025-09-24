import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Modal } from '@/components/ui';
import { getRender } from '@/test/util';

vi.mock('@/state/providers', { spy: true });

describe('<Modal />', () => {
    const render = getRender();
    const mockOnClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly when isOpen', () => {
        render(
            <Modal open={true} onClose={mockOnClose}>
                test test
            </Modal>,
        );
        expect(screen.getByText('test test')).toBeInTheDocument();
    });
});
