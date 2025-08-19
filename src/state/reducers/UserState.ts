import { UserStateAction } from '@/state/actions';
import { UserState } from '@/state/types';

export const userStateReducer = (
    prevState: UserState,
    action: UserStateAction,
) => {
    //console.log('dispatching action', action);
    switch (action.type) {
        case 'user_state/set_user_name': {
            return {
                ...prevState,
                userName:
                    action.payload !== undefined
                        ? action.payload
                        : prevState.userName,
            };
        }
        case 'user_state/set_profile_image': {
            return {
                ...prevState,
                profileImage:
                    action.payload !== undefined
                        ? action.payload
                        : prevState.userName,
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
};
