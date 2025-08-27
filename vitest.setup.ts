import { vi } from 'vitest';

import '@testing-library/jest-dom';

vi.mock('next/font/google', () => ({
    Rubik_Wet_Paint: () => ({
        className: 'mocked-rubik-wet-paint-google-font-class',
    }),
    Josefin_Sans: () => ({
        className: 'mocked-josefin-sans-google-font-class',
    }),
    Black_Han_Sans: () => ({
        className: 'mocked-black-han-sans-google-font-class',
    }),
}));
