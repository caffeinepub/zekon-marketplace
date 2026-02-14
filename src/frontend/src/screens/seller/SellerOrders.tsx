import { useListSellerOrders } from '../../hooks/useSellerOrders';
import OrderCard from '../../components/market/OrderCard';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export default function SellerOrders() {
  const { data: orders, isLoading, error } = useListSellerOrders();

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
        <CardTitle>Orders & Notifications</CardTitle>
        <CardDescription>Orders placed for your products with buyer contact and shipping information</CardDescription>
      </CardHeader>
      <CardContent>
        {orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={Number(order.id)} order={order} showBuyerInfo={true} />
            ))}
          </div>
        ) : (
          <EmptyState
            image="orders"
            title="No orders yet"
            description="When buyers purchase your products, their orders will appear here with contact and shipping information."
          />
        )}
      </CardContent>
    </Card>
  );
}
