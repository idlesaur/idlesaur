'use client';

import React from 'react';

import { Card, CardHeading } from '@/components/ui';
import { HighScore } from '@/types';

export interface ScoreRowProps {
    score: HighScore;
}

export const ScoreRow = ({ score }: ScoreRowProps) => {
    return (
        <div className="flex w-full flex-row items-center justify-between">
            <div>{score.rank}</div>
            <div>{score.userName}</div>
            <div>{score.score}</div>
        </div>
    );
};

export interface ScoresProps {
    scores: HighScore[];
}

export const Scores = ({ scores }: ScoresProps) => {
    return (
        <Card>
            <CardHeading>High Scores</CardHeading>
            <div className="flex w-full flex-row items-center justify-between">
                <div>Rank</div>
                <div>User</div>
                <div>Score</div>
            </div>
            <div className="flex w-full flex-col">
                {scores.map((score: HighScore) => (
                    <ScoreRow score={score} key={score.key} />
                ))}
            </div>
        </Card>
    );
};
