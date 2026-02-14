import { Order } from '../../backend';
import { Card, CardContent } from '../ui/card';
import { Calendar, User, Phone, MapPin, CreditCard } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  showBuyerInfo?: boolean;
}

function formatPaymentMethod(paymentMethod: Order['paymentMethod']): string {
  switch (paymentMethod.__kind__) {
    case 'paypal':
      return 'PayPal';
    case 'bankTransfer':
      return 'UPI';
    case 'cashOnDelivery':
      return 'Cash on Delivery';
    case 'creditCard':
      return 'Credit Card';
    default:
      return 'Unknown';
  }
}

function formatAddress(address: Order['shippingAddress']): string {
  return `${address.street}, ${address.city}, ${address.state} ${address.zip}, ${address.country}`;
}

export default function OrderCard({ order, showBuyerInfo = false }: OrderCardProps) {
  const price = Number(order.productSnapshot.price);
  const date = new Date(Number(order.createdAt) / 1000000);

  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="w-24 h-24 flex-shrink-0 bg-muted">
          <img
            src={order.productSnapshot.imageUrl}
            alt={order.productSnapshot.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/assets/generated/empty-products.dim_800x600.png';
            }}
          />
        </div>
        <CardContent className="flex-1 p-4">
          <h3 className="font-semibold text-foreground">{order.productSnapshot.name}</h3>
          <p className="text-lg font-bold text-primary mt-1">${price}</p>
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <Calendar className="h-3 w-3 mr-1" />
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </div>

          {/* Shipping Address */}
          <div className="mt-3 pt-3 border-t border-border space-y-2">
            <div className="flex items-start text-xs">
              <MapPin className="h-3 w-3 mr-1.5 mt-0.5 flex-shrink-0 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <span className="text-muted-foreground">Shipping: </span>
                <span className="text-foreground">{formatAddress(order.shippingAddress)}</span>
              </div>
            </div>

            <div className="flex items-start text-xs">
              <CreditCard className="h-3 w-3 mr-1.5 mt-0.5 flex-shrink-0 text-muted-foreground" />
              <div className="flex-1">
                <span className="text-muted-foreground">Payment: </span>
                <span className="text-foreground">{formatPaymentMethod(order.paymentMethod)}</span>
              </div>
            </div>
          </div>

          {showBuyerInfo && (
            <div className="mt-3 pt-3 border-t border-border space-y-1">
              <div className="flex items-start text-xs">
                <User className="h-3 w-3 mr-1.5 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <span className="text-muted-foreground">Buyer: </span>
                  <span className="font-medium text-foreground break-all">
                    {order.buyerProfileSnapshot.displayName}
                  </span>
                </div>
              </div>
              <div className="flex items-start text-xs">
                <Phone className="h-3 w-3 mr-1.5 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <span className="text-muted-foreground">Phone: </span>
                  <span className="font-medium text-foreground">
                    {order.buyerProfileSnapshot.phoneNumber || 'Not provided'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
