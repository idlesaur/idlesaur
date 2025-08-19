export type UserStateActionType =
    | 'user_state/set_user_name'
    | 'user_state/set_profile_image';

export interface UserStateAction {
    type: UserStateActionType;
    payload?: string;
}

const SET_USER_NAME: UserStateActionType = 'user_state/set_user_name';
export const setUserName = (username: string) => ({
    type: SET_USER_NAME,
    payload: username,
});

const SET_PROFILE_IMAGE: UserStateActionType = 'user_state/set_profile_image';
export const setProfileImage = (profileImage: string) => ({
    type: SET_PROFILE_IMAGE,
    payload: profileImage,
});
