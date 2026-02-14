import { useSaveCurrentUserProfile } from '../../hooks/useCurrentUserProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { UserProfile } from '../../backend';
import Logo from '../branding/Logo';
import { toast } from 'sonner';
import ProfileForm from './ProfileForm';
import AttributionLine from '../common/AttributionLine';

export default function ProfileSetupForm() {
  const { mutate: saveProfile, isPending } = useSaveCurrentUserProfile();

  const handleSubmit = (profile: UserProfile) => {
    saveProfile(profile, {
      onSuccess: () => {
        toast.success('Profile created successfully!');
      },
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : 'Failed to create profile');
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <Logo size="md" />
            </div>
            <div>
              <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
              <CardDescription>Tell us a bit about yourself to get started</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ProfileForm onSubmit={handleSubmit} isPending={isPending} submitLabel="Get Started" />
          </CardContent>
        </Card>
      </div>
      
      <AttributionLine />
    </div>
  );
}
