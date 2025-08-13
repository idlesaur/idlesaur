// game
export const TICKS_PER_SECOND: number = 15;
export const BASE_BONE_COST_BONE_DIGGER: number = 15;
export const BASE_BONES_PER_SECOND_PER_DIGGER: number = 1.0;

// save settings
export const DEFAULT_AUTO_SAVE_DELAY: number = 2 * 60 * 1000; // X minutes
export const GAME_SAVE_KEY: string = 'gamesave';

// general
export enum Routes {
    HOME = '/',
    GAME = '/game',
    POST = '/post/:id',
}
