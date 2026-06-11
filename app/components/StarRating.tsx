interface StarRatingProps {
  rating: number;
  showCount?: boolean;
  size?: "sm" | "md";
}

export default function StarRating({ rating, showCount = true, size = "sm" }: StarRatingProps) {
  const starSize = size === "sm" ? 14 : 16;
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.floor(rating);
    const half = !filled && i === Math.ceil(rating) && rating % 1 >= 0.3;

    stars.push(
      <span key={i} className="relative inline-block" style={{ width: starSize, height: starSize }}>
        <svg width={starSize} height={starSize} viewBox="0 0 24 24" fill="#d1d5db" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
        {(filled || half) && (
          <svg
            width={starSize}
            height={starSize}
            viewBox="0 0 24 24"
            fill="#f59e0b"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
            style={{ clipPath: half ? "inset(0 50% 0 0)" : undefined }}
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        )}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2 text-sm text-slate-600">
      <span className="flex items-center gap-1">{stars}</span>
      {showCount && <span className="text-xs text-slate-500">({rating.toFixed(1)})</span>}
    </span>
  );
}
