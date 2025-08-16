import { expect, test, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';

import { render } from '@/test/util';
import { Game } from '@/components/pages';

vi.mock('next/navigation');
vi.mock('next-auth/react', { spy: true });

test('should render correctly with a valid session user', () => {
    vi.mocked(useSession).mockReturnValue({
        data: { user: { foo: 'bar' } },
    } as never);
    render(<Game />);
    expect(screen.getByTestId('top-bar')).toBeInTheDocument();
});

test('should render null without a valid session user', () => {
    render(<Game />);
    expect(screen.queryByText('top-bar')).not.toBeInTheDocument();
});
