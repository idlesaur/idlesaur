import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { getRender, WrapperOptions } from '@/test/util';
import { BuildADinoCard } from '@/components/page/game';

describe('<BuildADinoCard />', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockBuyDinoAction = vi.fn();
    const mockBuyDinosaurCapacityUpgradeAction = vi.fn();

    const doRender = (wrapperOptions: WrapperOptions = {}) => {
        const render = getRender(wrapperOptions);
        return render(
            <BuildADinoCard
                buyDinoAction={mockBuyDinoAction}
                buyDinosaurCapacityUpgradeAction={
                    mockBuyDinosaurCapacityUpgradeAction
                }
            />,
        );
    };

    it('renders and enables buy dinosaur button when affordable and capacity available', async () => {
        doRender({
            currencyState: { bones: 500000 },
            upgradesState: { dinosaurCapacity: 1 },
        });

        const buildButton = screen.getByRole('button', {
            name: /build dinosaur/i,
        });
        expect(buildButton).toBeEnabled();

        await userEvent.click(buildButton);
        expect(mockBuyDinoAction).toHaveBeenCalled();
    });

    it('disables buy dinosaur button if not enough bones', () => {
        doRender({
            currencyState: { bones: 10 },
            upgradesState: { dinosaurCapacity: 1 },
        });

        const buildButton = screen.getByRole('button', {
            name: /build dinosaur/i,
        });
        expect(buildButton).toBeDisabled();
    });

    it('Calls buyDinoAction when can afford and CTA clicked', async () => {
        doRender({
            currencyState: { bones: 1000000 },
            upgradesState: { dinosaurCapacity: 5 },
        });

        const buildButton = screen.getByRole('button', {
            name: /build dinosaur/i,
        });
        expect(buildButton).toBeEnabled();
        await userEvent.click(buildButton);

        expect(mockBuyDinoAction).toHaveBeenCalled();
    });

    it('Calls buyDinosaurCapacityUpgradeAction when can afford and CTA clicked', async () => {
        doRender({
            currencyState: { bones: 1000000 },
            upgradesState: { dinosaurCapacity: 5 },
        });

        const button = screen.getByRole('button', {
            name: /Increase Dinosaur Capacity/i,
        });
        expect(button).toBeEnabled();
        await userEvent.click(button);

        expect(mockBuyDinosaurCapacityUpgradeAction).toHaveBeenCalled();
    });
});
