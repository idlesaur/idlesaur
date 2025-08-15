import { Dino } from '@/state/types/Dino';

export interface GameState {
    bones: number;
    boneDiggers: number;
    dinos: Array<Dino>;
    maxDinos: number;
}
