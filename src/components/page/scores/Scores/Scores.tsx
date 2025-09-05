'use client';

import React from 'react';

import { Card, CardHeading } from '@/components/ui';
import { HighScore } from '@/types';
import Link from 'next/link';
import { Routes } from '@/constants';
import { formatNumber } from '@/util';

export interface ScoreRowProps {
    score: HighScore;
}

export const ScoreRow = ({ score }: ScoreRowProps) => {
    return (
        <div className="grid w-full grid-cols-3 py-2 text-center">
            <div>{score.rank}</div>
            <div>
                {score.publicProfile && score.userName ? (
                    <Link
                        href={Routes.PUBLIC_PROFILE(score.userName)}
                        className="underline"
                    >
                        {score.userName}
                    </Link>
                ) : (
                    score.userName
                )}
            </div>
            <div>{formatNumber(score.score)}</div>
        </div>
    );
};

export interface ScoresProps {
    scores: HighScore[];
}

export const Scores = ({ scores }: ScoresProps) => {
    return (
        <Card className="w-xl">
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
