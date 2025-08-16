import { GameStateAction } from '@/state/actions';
import { getBoneDiggerCost } from '@/util';
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
        case 'game_state/purchase_bone_digger': {
            const cost = getBoneDiggerCost(prevState, action.payload);
            if (cost > prevState.bones) {
                return {
                    ...prevState,
                };
            }
            return {
                ...prevState,
                bones: prevState.bones - cost,
                boneDiggers: prevState.boneDiggers + (action.payload ?? 0),
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
};
