import { expect, test } from 'vitest';
import { screen } from '@testing-library/react';

import { Routes } from '@/constants';
import { getRender } from '@/test/util';
import { Home } from '@/components/pages';

test('should render correctly and show sign in button when signed out', async () => {
    const render = getRender();
    render(<Home posts={[]} />);

    // Assert heading and button exist
    expect(
        screen.getByRole('heading', { level: 1, name: 'Idlesaur' }),
    ).toBeInTheDocument();

    const playButton = screen.getByRole('button', { name: 'Sign In' });
    expect(playButton).toBeInTheDocument();
});

test('should navigate to Play when clicked and signed in', async () => {
    const render = getRender({
        session: {
            user: { name: 'test' },
            expires: '',
        },
    });

    render(<Home posts={[]} />);

    // Assert heading and button exist
    expect(
        screen.getByRole('heading', { level: 1, name: 'Idlesaur' }),
    ).toBeInTheDocument();

    const playButton = screen.getByRole('link', { name: 'Play' });
    expect(playButton).toBeInTheDocument();

    // Assert
    expect(playButton).toHaveAttribute('href', Routes.GAME);
});
