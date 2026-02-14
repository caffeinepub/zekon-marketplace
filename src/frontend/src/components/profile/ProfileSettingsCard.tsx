import { useGetCurrentUserProfile, useSaveCurrentUserProfile } from '../../hooks/useCurrentUserProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { UserProfile } from '../../backend';
import { toast } from 'sonner';
import ProfileForm from './ProfileForm';
import LoadingState from '../common/LoadingState';
import ErrorState from '../common/ErrorState';

export default function ProfileSettingsCard() {
  const { data: userProfile, isLoading, error } = useGetCurrentUserProfile();
  const { mutate: saveProfile, isPending } = useSaveCurrentUserProfile();

  const handleSubmit = (profile: UserProfile) => {
    saveProfile(profile, {
      onSuccess: () => {
        toast.success('Profile updated successfully!');
      },
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : 'Failed to update profile');
      },
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <LoadingState />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-6">
          <ErrorState error={error} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Update your display name, phone number, and role</CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileForm
          initialProfile={userProfile}
          onSubmit={handleSubmit}
          isPending={isPending}
          submitLabel="Update Profile"
        />
      </CardContent>
    </Card>
  );
}
