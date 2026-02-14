import { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import TopAppBar from '../../components/layout/TopAppBar';
import BottomNav from '../../components/navigation/BottomNav';
import BuyerHome from './BuyerHome';
import BuyerOrders from './BuyerOrders';
import ProfileSettingsCard from '../../components/profile/ProfileSettingsCard';

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState<'home' | 'orders'>('home');

  return (
    <AppLayout>
      <TopAppBar />
      <main className="container px-4 py-6 pb-24 space-y-8">
        {activeTab === 'home' && <BuyerHome />}
        {activeTab === 'orders' && (
          <>
            <BuyerOrders />
            <ProfileSettingsCard />
          </>
        )}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </AppLayout>
  );
}
