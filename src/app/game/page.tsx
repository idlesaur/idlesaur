import { Page } from '@/components/page/game';
import {
    buyDino,
    buyDinosaurCapacityUpgrade,
    buyBoneDiggers,
    dig,
    renameDino,
} from '@/app/lib/actions';

export default async function Game() {
    return (
        <div className="flex w-full flex-1 flex-col">
            <Page
                buyDinoAction={buyDino}
                buyDinosaurCapacityUpgradeAction={buyDinosaurCapacityUpgrade}
                buyBoneDiggersAction={buyBoneDiggers}
                digAction={dig}
                renameDinosaurAction={renameDino}
            />
        </div>
    );
}
