import { Product } from '../../backend';
import { Card, CardContent } from '../ui/card';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const price = Number(product.price);

  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/assets/generated/empty-products.dim_800x600.png';
          }}
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
        <p className="text-lg font-bold text-primary mt-1">${price}</p>
      </CardContent>
    </Card>
  );
}
