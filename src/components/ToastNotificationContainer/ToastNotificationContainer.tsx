'use client';

import React from 'react';
import { useToastsStore } from '@/state/providers';
import { ToastNotification } from '@/components';

export const ToastNotificationContainer = () => {
    const toasts = useToastsStore((state) => state.toasts);
    const removeToast = useToastsStore((state) => state.removeToast);
    const handleOnClose = (toastId: string) => {
        console.log('close - ', toastId);
        removeToast(toastId);
    };
    return (
        <div className="fixed bottom-4 left-4 z-5 flex flex-col gap-2">
            {toasts.map((toast) => (
                <ToastNotification
                    key={toast.id}
                    title={toast.title}
                    variant={toast.variant}
                    content={toast.content}
                    onClose={() => handleOnClose(toast.id)}
                />
            ))}
        </div>
    );
};
