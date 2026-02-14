interface EmptyStateProps {
  image: 'products' | 'orders';
  title: string;
  description: string;
}

export default function EmptyState({ image, title, description }: EmptyStateProps) {
  const imageSrc =
    image === 'products'
      ? '/assets/generated/empty-products.dim_800x600.png'
      : '/assets/generated/empty-orders.dim_800x600.png';

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
      <img src={imageSrc} alt={title} className="w-64 h-48 object-contain opacity-50" />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-md">{description}</p>
      </div>
    </div>
  );
}
