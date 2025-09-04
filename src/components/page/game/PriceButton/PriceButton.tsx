import React, { ReactNode } from 'react';
import { Button, ButtonProps } from '@/components/ui';

interface IconPriceButtonProps extends Omit<ButtonProps, 'children'> {
    icon?: ReactNode; // optional icon before price/text
    price?: string | number; // optional price right after icon
    text?: string; // button label
}

export const PriceButton = ({
    icon,
    price,
    text,
    ...buttonProps
}: IconPriceButtonProps) => {
    return (
        <Button {...buttonProps}>
            <span className="flex items-center gap-2">
                {icon && <span className="flex-shrink-0">{icon}</span>}
                {price !== undefined && (
                    <span className="text-sm">{price}</span>
                )}
                {text && <span>{text}</span>}
            </span>
        </Button>
    );
};
