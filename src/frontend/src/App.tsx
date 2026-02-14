import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCurrentUserProfile } from './hooks/useCurrentUserProfile';
import AuthScreen from './components/auth/AuthScreen';
import ProfileSetupForm from './components/profile/ProfileSetupForm';
import BuyerDashboard from './screens/buyer/BuyerDashboard';
import SellerDashboard from './screens/seller/SellerDashboard';
import LoadingState from './components/common/LoadingState';
import { Variant_seller_buyer } from './backend';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCurrentUserProfile();

  const isAuthenticated = !!identity;

  // Show loading during initialization
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingState />
      </div>
    );
  }

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  // Show loading while fetching profile
  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingState />
      </div>
    );
  }

  // Show profile setup if authenticated but no profile exists
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;
  if (showProfileSetup) {
    return <ProfileSetupForm />;
  }

  // Route to appropriate dashboard based on role
  if (userProfile?.role === Variant_seller_buyer.buyer) {
    return <BuyerDashboard />;
  }

  if (userProfile?.role === Variant_seller_buyer.seller) {
    return <SellerDashboard />;
  }

  // Fallback loading state
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoadingState />
    </div>
  );
}
