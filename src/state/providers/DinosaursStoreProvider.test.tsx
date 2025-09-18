import { act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import {
    DinosaursStoreProvider,
    useDinosaursStore,
} from './DinosaursStoreProvider';
import { createDinosaursState } from '@/state/stores';

// Test consumer that renders dinosaurs
const DinosaursConsumer = () => {
    const dinos = useDinosaursStore((s) => s.dinosaurs);
    return (
        <div>
            {dinos.map((d) => (
                <div key={d.id} data-testid="dino">
                    {d.name}
                </div>
            ))}
        </div>
    );
};

describe('DinosaursStoreProvider', () => {
    it('provides default empty state when no initialState is passed', () => {
        const initialState = {
            ...createDinosaursState(),
            dinosaurs: [],
        };

        render(
            <DinosaursStoreProvider initialState={initialState}>
                <DinosaursConsumer />
            </DinosaursStoreProvider>,
        );

        expect(screen.queryByTestId('dino')).toBeNull();
    });

    it('respects the initialState passed into the provider', () => {
        const initialState = createDinosaursState({
            dinosaurs: [
                {
                    id: '1',
                    name: 'Rex',
                    type: 'RAPTOR',
                    userId: 'user1',
                    alive: true,
                    level: 1,
                    experience: 0,
                    nextLevelExperience: 10,
                    health: 100,
                    maxHealth: 100,
                    attack: 10,
                    defense: 5,
                    speed: 5,
                    special: 0,
                    specialDefense: 0,
                },
            ],
        });

        render(
            <DinosaursStoreProvider initialState={initialState}>
                <DinosaursConsumer />
            </DinosaursStoreProvider>,
        );

        expect(screen.getByText('Rex')).toBeInTheDocument();
    });

    it('throws an error when useDinosaursStore is used outside of provider', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

        const BadConsumer = () => {
            useDinosaursStore((s) => s.dinosaurs);
            return <div />;
        };

        expect(() => render(<BadConsumer />)).toThrowError(
            /useDinosaursStore must be used within DinosaursStoreProvider/,
        );

        spy.mockRestore();
    });

    it('adds a dinosaur when addDinosaur is called', async () => {
        const initialState = {
            ...createDinosaursState(),
            dinosaurs: [],
        };

        const AddDinoButton = () => {
            const addDino = useDinosaursStore((s) => s.addDinosaur);
            return (
                <button
                    onClick={() =>
                        addDino({
                            id: '2',
                            name: 'Trike',
                            type: 'RAPTOR',
                            userId: 'user2',
                            alive: true,
                            level: 1,
                            experience: 0,
                            nextLevelExperience: 10,
                            health: 100,
                            maxHealth: 100,
                            attack: 8,
                            defense: 6,
                            speed: 4,
                            special: 0,
                            specialDefense: 1,
                        })
                    }
                >
                    add
                </button>
            );
        };

        render(
            <DinosaursStoreProvider initialState={initialState}>
                <AddDinoButton />
                <DinosaursConsumer />
            </DinosaursStoreProvider>,
        );

        expect(screen.queryByText('Trike')).toBeNull();

        act(() => {
            screen.getByText('add').click();
        });

        expect(await screen.findByText('Trike')).toBeInTheDocument();
    });
});
