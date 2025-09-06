import React from 'react';
import { render, screen } from '@testing-library/react';
import { Scores, ScoreRow } from '@/components/page/scores';
import { Routes } from '@/constants';
import { HighScore } from '@/types';
import { vi, describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('@/util', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@/util')>();
    return {
        ...actual,
        formatNumber: vi.fn((n: number) => `formatted(${n})`),
    };
});

describe('ScoreRow', () => {
    const baseScore: HighScore = {
        key: '1',
        rank: 1,
        userName: 'PlayerOne',
        score: 12345,
        publicProfile: true,
    };

    it('renders rank, username, and formatted score', () => {
        render(<ScoreRow score={baseScore} />);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('PlayerOne')).toBeInTheDocument();
        expect(screen.getByText('formatted(12345)')).toBeInTheDocument();
    });

    it('renders username as a link when publicProfile is true', () => {
        render(<ScoreRow score={{ ...baseScore, publicProfile: true }} />);
        const link = screen.getByRole('link', { name: 'PlayerOne' });
        expect(link).toHaveAttribute(
            'href',
            Routes.PUBLIC_PROFILE('PlayerOne'),
        );
    });

    it('renders username as plain text when publicProfile is false', () => {
        render(<ScoreRow score={{ ...baseScore, publicProfile: false }} />);
        expect(screen.getByText('PlayerOne')).toBeInTheDocument();
        expect(
            screen.queryByRole('link', { name: 'PlayerOne' }),
        ).not.toBeInTheDocument();
    });
});

describe('Scores', () => {
    const scores: HighScore[] = [
        {
            key: '1',
            rank: 1,
            userName: 'PlayerOne',
            score: 123,
            publicProfile: true,
        },
        {
            key: '2',
            rank: 2,
            userName: 'PlayerTwo',
            score: 456,
            publicProfile: false,
        },
    ];

    it('renders heading', () => {
        render(<Scores scores={scores} />);
        expect(screen.getByText('High Scores')).toBeInTheDocument();
    });

    it('renders table header row', () => {
        render(<Scores scores={scores} />);
        expect(screen.getByText('Rank')).toBeInTheDocument();
        expect(screen.getByText('User')).toBeInTheDocument();
        expect(screen.getByText('Score')).toBeInTheDocument();
    });

    it('renders all score rows', () => {
        render(<Scores scores={scores} />);
        expect(screen.getByText('PlayerOne')).toBeInTheDocument();
        expect(screen.getByText('PlayerTwo')).toBeInTheDocument();
    });
});
