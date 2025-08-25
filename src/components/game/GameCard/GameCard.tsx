import React, { ReactNode } from 'react';
import { Card, CardHeading } from '@/components/ui';

export interface GameCardProps {
    icon: ReactNode;
    children: ReactNode;
    title: string;
}

export const GameCard = ({ icon, children, title }: GameCardProps) => {
    return (
        <Card className="w-xs">
            <CardHeading>
                <div className="bg-background-700 flex flex-row items-center rounded-2xl">
                    <div className="bg-background-800 rounded-2xl p-1">
                        {icon}
                    </div>
                    <span className="flex w-full items-center justify-center self-center">
                        {title}
                    </span>
                </div>
            </CardHeading>
            {children}
        </Card>
    );
};
