import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useState } from 'react';

import { mockUseDinosaursStore } from '@/test/mockUseDinosaursStore';
import { ManageDinoCard } from '@/components/page/game';
import { useDinosaursStore, useToastsStore } from '@/state/providers';
import { mockDinosaur } from '@/test/mockFactory';
import { mockUseToastsStore } from '@/test/mockUseToastsStore';

vi.mock('@/state/providers', { spy: true });
vi.mock('react', { spy: true });

describe('<ManageDinoCard />', () => {
    const mockUseDinosaursStoreInstance = vi.mocked(useDinosaursStore);
    const mockUseToastsStoreInstance = vi.mocked(useToastsStore);
    const mockSetState = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        mockUseToastsStore(mockUseToastsStoreInstance);
        // @ts-expect-error any type
        vi.mocked(useState).mockImplementation((init) => [init, mockSetState]);
    });

    it('renders correctly when a dinosaur is selected', () => {
        const name = 'test dino';
        mockUseDinosaursStore(mockUseDinosaursStoreInstance, {
            selectedDinosaur: mockDinosaur({ name }),
        });

        render(<ManageDinoCard renameDinosaurAction={vi.fn()} />);
        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it('displays "Rename" button and opens the modal when clicked', async () => {
        mockUseDinosaursStore(mockUseDinosaursStoreInstance, {
            selectedDinosaur: mockDinosaur({ name: 'Dino' }),
        });

        render(<ManageDinoCard renameDinosaurAction={vi.fn()} />);
        const btn = screen.getByRole('button', { name: 'Rename' });

        expect(btn).toBeInTheDocument();
        await userEvent.click(btn);

        expect(mockSetState).toHaveBeenCalledWith(true);
    });

    it('does not render when no dinosaur is selected', () => {
        mockUseDinosaursStore(mockUseDinosaursStoreInstance, {
            selectedDinosaur: undefined,
        });

        const { container } = render(
            <ManageDinoCard renameDinosaurAction={vi.fn()} />,
        );

        expect(container).toBeEmptyDOMElement();
    });
});
