import { BoneSystemCard, GameTick, TopBar } from '@/components/page/game';

export default async function Game() {
    return (
        <div className="flex w-full flex-1 flex-col">
            <GameTick />
            <TopBar />
            <main className="flex flex-1 flex-col items-center justify-center">
                <div className="flex flex-row items-start justify-center gap-3">
                    <BoneSystemCard />
                </div>
            </main>
            <footer className="flex flex-wrap items-center justify-center"></footer>
        </div>
    );
}
