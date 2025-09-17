import React from 'react';
import { useToastsStore } from '@/state/providers';
import { ToastNotification } from '@/components';

export const ToastNotificationContainer = () => {
    const { toasts } = useToastsStore((state) => state);
    return (
        <div className="">
            {toasts.map((toast) => (
                <ToastNotification
                    key={toast.title} // TODO: better key
                    title={toast.title}
                    variant={toast.variant}
                    content={toast.content}
                />
            ))}
        </div>
    );
};
