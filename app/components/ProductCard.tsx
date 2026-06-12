import { useNavigate } from "react-router";
import type { Product } from "../types/product";
import StarRating from "./StarRating";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const discounted = product.discountPercentage > 0;
  const originalPrice = discounted
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded border border-slate-200 bg-white transition duration-200 flex flex-row md:flex-col"
      onClick={() => navigate(`/product/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/product/${product.id}`)}
      aria-label={`View ${product.title}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-40 md:h-56 w-full object-contain transition duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/300x300?text=No+Image";
          }}
        />
        {discounted && (
          <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-red-500/20">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>
      <div className="space-y-3 p-5">
        <h3 className="text-sm font-semibold leading-6 text-slate-950">
          {product.title}
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-lg font-semibold text-slate-950">
            ${product.price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-slate-500 line-through">
              ${originalPrice}
            </span>
          )}
        </div>
        <StarRating rating={product.rating} />
      </div>
    </div>
  );
}
