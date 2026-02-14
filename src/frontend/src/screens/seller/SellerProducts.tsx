import { useListMyProducts } from '../../hooks/useMyProducts';
import ProductCard from '../../components/market/ProductCard';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';

export default function SellerProducts() {
  const { data: products, isLoading, error } = useListMyProducts();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} title="Failed to load your products" />;
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        image="products"
        title="No Products Listed"
        description="You haven't listed any products yet. Add your first product above to get started!"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">My Products</h2>
        <p className="text-muted-foreground">Manage your product listings</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={Number(product.id)} product={product} />
        ))}
      </div>
    </div>
  );
}
