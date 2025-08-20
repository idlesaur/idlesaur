import { expect, test } from 'vitest';
import { screen } from '@testing-library/react';

import { render } from '@/test/util';
import { TopBar } from './TopBar';

test('should render correctly', () => {
    render(<TopBar />);
    expect(screen.getByTestId('top-bar')).toBeInTheDocument();
});
