import AppLayout from '../../components/layout/AppLayout';
import TopAppBar from '../../components/layout/TopAppBar';
import AddProductForm from './AddProductForm';
import SellerProducts from './SellerProducts';
import SellerOrders from './SellerOrders';
import ProfileSettingsCard from '../../components/profile/ProfileSettingsCard';

export default function SellerDashboard() {
  return (
    <AppLayout>
      <TopAppBar />
      <main className="container px-4 py-6 space-y-8">
        <AddProductForm />
        <SellerProducts />
        <SellerOrders />
        <ProfileSettingsCard />
      </main>
    </AppLayout>
  );
}
