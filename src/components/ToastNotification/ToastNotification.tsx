import React from 'react';
import { twMerge } from 'tailwind-merge';
import {
    PiCheckBold,
    PiXBold,
    PiInfoBold,
    PiWarningBold,
    PiQuestionBold,
} from 'react-icons/pi';

const ICON_SIZE = 20;

export type NotificationVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastNotificationProps {
    title: string;
    content?: React.ReactNode | string;
    variant: NotificationVariant;
}

export const getVariantIcon = (variant: NotificationVariant) => {
    switch (variant) {
        case 'success':
            return <PiCheckBold size={ICON_SIZE} />;
        case 'error':
            return <PiXBold size={ICON_SIZE} />;
        case 'info':
            return <PiInfoBold size={ICON_SIZE} />;
        case 'warning':
            return <PiWarningBold size={ICON_SIZE} />;
        default:
            return <PiQuestionBold size={ICON_SIZE} />;
    }
};

export const ToastNotification = ({
    content,
    title,
    variant,
}: ToastNotificationProps) => {
    const className = twMerge(
        'bg-background-800 flex w-80 flex-col flex-wrap rounded-lg border-2 p-3',
        variant === 'success' && 'border-green-400',
        variant === 'error' && 'border-red-400',
        variant === 'info' && 'border-blue-400',
        variant === 'warning' && 'border-yellow-400',
    );
    const icon = getVariantIcon(variant);

    return (
        <div className={className}>
            <div className="flex flex-row items-center font-bold">
                {icon}
                <div className="ml-2">{title}</div>
            </div>
            <div>{content}</div>
        </div>
    );
};
