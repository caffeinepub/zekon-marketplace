import { Home, ShoppingCart } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'orders';
  onTabChange: (tab: 'home' | 'orders') => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-around px-4">
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center space-y-1 px-6 py-2 transition-colors ${
            activeTab === 'home'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs font-medium">Home</span>
        </button>

        <button
          onClick={() => onTabChange('orders')}
          className={`flex flex-col items-center justify-center space-y-1 px-6 py-2 transition-colors ${
            activeTab === 'orders'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="text-xs font-medium">Orders</span>
        </button>
      </div>
    </nav>
  );
}
