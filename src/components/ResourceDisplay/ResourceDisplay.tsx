import { PiBone } from 'react-icons/pi';
import { PiQuestion } from 'react-icons/pi';
import React from 'react';
import { formatNumber } from '@/util';

export enum ResourceType {
    UNKNOWN,
    BONES,
}

export interface ResourceDisplayProps {
    value: number;
    type?: ResourceType;
}

export const getIcon = (type: ResourceType) => {
    switch (type) {
        case ResourceType.UNKNOWN:
            return <PiQuestion />;
        case ResourceType.BONES:
            return <PiBone />;
    }
};

export const ResourceDisplay = ({
    value,
    type = ResourceType.UNKNOWN,
}: ResourceDisplayProps) => {
    const icon = getIcon(type);
    return (
        <div className="bg-background-700 flex flex-row items-center rounded-2xl pr-3">
            <div className="bg-background-800 rounded-2xl p-1">{icon}</div>
            <span className="pl-1">{formatNumber(value)}</span>
        </div>
    );
};
