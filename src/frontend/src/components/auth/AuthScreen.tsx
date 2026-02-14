import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '../ui/button';
import Logo from '../branding/Logo';
import { Loader2 } from 'lucide-react';
import AttributionLine from '../common/AttributionLine';

export default function AuthScreen() {
  const { login, loginStatus } = useInternetIdentity();

  const isLoggingIn = loginStatus === 'logging-in';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          {/* Banner */}
          <div className="text-center space-y-4">
            <img
              src="/assets/generated/zekon-banner.dim_1200x400.png"
              alt="Zekon Marketplace"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>

          {/* Auth Card */}
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8 space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Logo size="lg" />
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Welcome to Zekon</h1>
                <p className="text-muted-foreground">
                  Your trusted marketplace for buying and selling
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={login}
                disabled={isLoggingIn}
                className="w-full h-12 text-lg font-semibold"
                size="lg"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Sign In to Continue'
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secure authentication powered by Internet Identity
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            New to Zekon? Sign in to create your account
          </p>
        </div>
      </div>
      
      <AttributionLine />
    </div>
  );
}
