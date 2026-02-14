import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';
import Logo from '../branding/Logo';
import { LogOut } from 'lucide-react';
import { useGetCurrentUserProfile } from '../../hooks/useCurrentUserProfile';
import AttributionLine from '../common/AttributionLine';

export default function TopAppBar() {
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetCurrentUserProfile();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <Logo size="sm" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Zekon</h1>
              {userProfile && (
                <p className="text-xs text-muted-foreground">Welcome, {userProfile.displayName}</p>
              )}
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        <AttributionLine />
      </header>
    </>
  );
}
