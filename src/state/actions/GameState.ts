export type GameStateActionType =
    | 'game_state/set_bones'
    | 'game_state/purchase_bone_digger';

export interface GameStateAction {
    type: GameStateActionType;
    payload?: number;
}

const SET_BONES: GameStateActionType = 'game_state/set_bones';
export const setBones = (bones: number) => ({
    type: SET_BONES,
    payload: bones,
});

const PURCHASE_BONE_DIGGER: GameStateActionType =
    'game_state/purchase_bone_digger';
export const purchaseBoneDiggers = (diggersToPurchase: number = 1) => ({
    type: PURCHASE_BONE_DIGGER,
    payload: diggersToPurchase,
});
