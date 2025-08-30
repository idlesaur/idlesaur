import { ProfileType } from '@/schema';
import { Heading } from '@/components/ui';

export interface EditProfileProps {
    profile: ProfileType;
}

export const EditProfile = ({ profile }: EditProfileProps) => {
    return (
        <div>
            <Heading level={2}>Profile</Heading>
            <Heading level={4}>{profile.userName}</Heading>
            <form>
                <input type="text" value="" />
            </form>
        </div>
    );
};
