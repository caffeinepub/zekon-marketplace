interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <img
      src="/assets/generated/zekon-logo.dim_512x512.png"
      alt="Zekon"
      className={`${sizeClasses[size]} ${className}`}
    />
  );
}
