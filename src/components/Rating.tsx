import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export default function Rating({ value, count, size = 'sm', showCount = false }: RatingProps) {
  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };
  const textSize = size === 'lg' ? 'text-base' : size === 'md' ? 'text-sm' : 'text-xs';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`${sizes[size]} ${
              n <= Math.round(value) ? 'fill-saffron-400 text-saffron-400' : 'fill-cream-200 text-cream-200'
            }`}
          />
        ))}
      </div>
      <span className={`${textSize} font-medium text-forest-600`}>{value.toFixed(1)}</span>
      {showCount && count !== undefined && (
        <span className={`${textSize} text-forest-400`}>({count})</span>
      )}
    </div>
  );
}
