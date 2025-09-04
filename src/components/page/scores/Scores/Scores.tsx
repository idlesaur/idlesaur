'use client';

import React from 'react';

import { Card, CardHeading } from '@/components/ui';
import { HighScore } from '@/types';

export interface ScoreRowProps {
    score: HighScore;
}

export const ScoreRow = ({ score }: ScoreRowProps) => {
    return (
        <div className="grid w-full grid-cols-3 py-2 text-center">
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
        <Card className="w-80">
            <CardHeading>High Scores</CardHeading>

            <div className="bg-background-800 grid w-full grid-cols-3 py-2 text-center font-semibold">
                <div>Rank</div>
                <div>User</div>
                <div>Score</div>
            </div>

            <div className="flex w-full flex-col">
                {scores.map((score) => (
                    <ScoreRow score={score} key={score.key} />
                ))}
            </div>
        </Card>
    );
};
