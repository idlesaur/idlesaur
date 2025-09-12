import {
    BoneSystemCard,
    DinoSystemCard,
    GameTick,
    TopBar,
} from '@/components/page/game';

export default async function Game() {
    return (
        <div className="flex w-full flex-1 flex-col">
            <GameTick />
            <TopBar />
            <main className="my-3 flex w-full flex-1 flex-col items-start justify-center gap-3 sm:flex-row">
                <BoneSystemCard />
                <DinoSystemCard />
            </main>
        </div>
    );
}
