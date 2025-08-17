export type GameStateActionType =
    | 'game_state/set_bones'
    | 'game_state/set_bone_diggers';

export interface GameStateAction {
    type: GameStateActionType;
    payload?: number;
}

const SET_BONES: GameStateActionType = 'game_state/set_bones';
export const setBones = (bones: number) => ({
    type: SET_BONES,
    payload: bones,
});

const SET_BONE_DIGGERS: GameStateActionType = 'game_state/set_bone_diggers';
export const setBoneDiggers = (boneDiggers: number) => ({
    type: SET_BONE_DIGGERS,
    payload: boneDiggers,
});
