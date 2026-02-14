import { useListMyOrders } from '../../hooks/useOrders';
import OrderCard from '../../components/market/OrderCard';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';

export default function BuyerOrders() {
  const { data: orders, isLoading, error } = useListMyOrders();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} title="Failed to load orders" />;
  }

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        image="orders"
        title="No Orders Yet"
        description="You haven't placed any orders yet. Browse products and make your first purchase!"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">My Orders</h2>
        <p className="text-muted-foreground">View your order history with shipping and payment details</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={Number(order.id)} order={order} />
        ))}
      </div>
    </div>
  );
}
