// import { Dino } from '@/state/types/Dino';

export interface GameState {
    bones: number;
    setBones: (value: number) => void;
    boneDiggers: number;
    setBoneDiggers: (value: number) => void;
    // dinos: Array<Dino>;
    // maxDinos: number;
}
