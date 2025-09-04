import React from 'react';
import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { TopBar } from './TopBar';
import { useCurrencyStore } from '@/state/providers';
import { render } from '@/test/util';

vi.mock('@/state/providers', { spy: true });

describe('TopBar', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useCurrencyStore).mockReturnValue({ bones: 42 });
    });

    it('renders with bones value', () => {
        render(<TopBar />);
        expect(screen.getByText('42')).toBeInTheDocument();
    });
});
