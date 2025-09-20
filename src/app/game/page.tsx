import {
    BonesCard,
    BuildADinoCard,
    DinosCard,
    GameTick,
    TopBar,
} from '@/components/page/game';
import {
    buyDino,
    buyDinosaurCapacityUpgrade,
    buyBoneDiggers,
    dig,
} from '@/app/lib/actions';

export default async function Game() {
    return (
        <div className="flex w-full flex-1 flex-col">
            <GameTick />
            <TopBar />
            <main className="my-3 flex w-full flex-1 flex-col items-start justify-center gap-3 px-3 sm:flex-row">
                <BonesCard
                    buyBoneDiggersAction={buyBoneDiggers}
                    digAction={dig}
                />
                <BuildADinoCard
                    buyDinoAction={buyDino}
                    buyDinosaurCapacityUpgradeAction={
                        buyDinosaurCapacityUpgrade
                    }
                />
                <DinosCard />
            </main>
        </div>
    );
}
