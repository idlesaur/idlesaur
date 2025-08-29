import { create } from 'zustand';
import { GameState } from '@/state/types';

export const useStore = create<GameState>()((set) => ({
    bones: 0,
    setBones: (newBones: number) => set({ bones: newBones }),
    boneDiggers: 0,
    setBoneDiggers: (newBoneDiggers) => set({ boneDiggers: newBoneDiggers }),
}));
