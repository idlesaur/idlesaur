import { expect, test } from 'vitest';
import { screen } from '@testing-library/react';

import { Routes } from '@/constants';
import { render } from '@/test/util';
import { Home } from '@/components/pages';

test('should render correctly and navigate when Play is clicked', async () => {
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
