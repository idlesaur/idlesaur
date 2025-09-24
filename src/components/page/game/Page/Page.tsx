'use client';

import {
    BonesCard,
    BuildADinoCard,
    DinosCard,
    GameTick,
    ManageDinoCard,
    TopBar,
} from '@/components/page/game';
import {
    BuyBoneDiggerState,
    BuyDinosaurCapacityUpgradeState,
    BuyDinoState,
    RenameDinoState,
} from '@/app/lib/types';
import { DigState } from '@/app/lib/actions/dig';
import { useDinosaursStore } from '@/state/providers';

export interface PageProps {
    buyBoneDiggersAction: (
        previousState: BuyBoneDiggerState | null,
        formData: FormData,
    ) => Promise<BuyBoneDiggerState>;
    buyDinoAction: (
        previousState: BuyDinoState | null,
        formData: FormData,
    ) => Promise<BuyDinoState>;
    buyDinosaurCapacityUpgradeAction: (
        previousState: BuyDinosaurCapacityUpgradeState | null,
        formData: FormData,
    ) => Promise<BuyDinosaurCapacityUpgradeState>;
    digAction: () => Promise<DigState>;
    renameDinosaurAction: (
        previousState: RenameDinoState | null,
        formData: FormData,
    ) => Promise<RenameDinoState>;
}

export const Page = ({
    buyBoneDiggersAction,
    digAction,
    buyDinoAction,
    buyDinosaurCapacityUpgradeAction,
    renameDinosaurAction,
}: PageProps) => {
    const dinosaurs = useDinosaursStore((state) => state.dinosaurs);
    const selectedDinosaur = useDinosaursStore(
        (state) => state.selectedDinosaur,
    );

    return (
        <>
            <GameTick />
            <TopBar />
            <main className="my-3 flex w-full flex-1 flex-col flex-wrap items-start justify-center gap-3 px-3 sm:flex-row">
                <BonesCard
                    buyBoneDiggersAction={buyBoneDiggersAction}
                    digAction={digAction}
                />
                <BuildADinoCard
                    buyDinoAction={buyDinoAction}
                    buyDinosaurCapacityUpgradeAction={
                        buyDinosaurCapacityUpgradeAction
                    }
                />
                {dinosaurs.length > 0 && <DinosCard />}
                {selectedDinosaur && (
                    <ManageDinoCard
                        renameDinosaurAction={renameDinosaurAction}
                    />
                )}
            </main>
        </>
    );
};
