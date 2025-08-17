import { GameStateAction } from '@/state/actions';
import { GameState } from '@/state/types';

export const gameStateReducer = (
    prevState: GameState,
    action: GameStateAction,
) => {
    //console.log('dispatching action', action);
    switch (action.type) {
        case 'game_state/set_bones': {
            return {
                ...prevState,
                bones:
                    action.payload !== undefined
                        ? action.payload
                        : prevState.bones,
            };
        }
        case 'game_state/set_bone_diggers': {
            return {
                ...prevState,
                boneDiggers:
                    action.payload !== undefined
                        ? action.payload
                        : prevState.boneDiggers,
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
};
