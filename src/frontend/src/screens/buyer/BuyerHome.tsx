import { useState } from 'react';
import { useListAllProducts } from '../../hooks/useProducts';
import { useCreateOrder } from '../../hooks/useOrders';
import ProductCard from '../../components/market/ProductCard';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import CheckoutDialog from '../../components/market/CheckoutDialog';
import { Product, Address, PaymentMethod } from '../../backend';
import { toast } from 'sonner';

export default function BuyerHome() {
  const { data: products, isLoading, error } = useListAllProducts();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCheckoutSubmit = (shippingAddress: Address, paymentMethod: PaymentMethod) => {
    if (!selectedProduct) return;

    createOrder(
      {
        productId: selectedProduct.id,
        shippingAddress,
        paymentMethod,
      },
      {
        onSuccess: () => {
          toast.success('Order placed successfully!');
          setSelectedProduct(null);
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : 'Failed to place order');
        },
      }
    );
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} title="Failed to load products" />;
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        image="products"
        title="No Products Available"
        description="There are no products listed yet. Check back soon!"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Available Products</h2>
        <p className="text-muted-foreground">Browse and purchase from our marketplace</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={Number(product.id)} product={product} onClick={() => handleProductClick(product)} />
        ))}
      </div>

      <CheckoutDialog
        product={selectedProduct}
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
        onSubmit={handleCheckoutSubmit}
        isPending={isPending}
      />
    </div>
  );
}
