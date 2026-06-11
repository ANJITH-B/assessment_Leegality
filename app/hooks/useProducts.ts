import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "../services/productApi";
import type { Product } from "../types/product";
import type { FilterState } from "../context/FilterContext";

interface UseProductsOptions {
  limit?: number;
}

interface UseProductsResult {
  products: Product[];
  filteredProducts: Product[];
  total: number;
  totalPages: number;
  availableBrands: string[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}


export function useProducts(
  filters: FilterState,
  { limit = 6 }: UseProductsOptions = {}
): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => setRetryCount((c) => c + 1), []);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    const skip = (filters.currentPage - 1) * limit;

    const request = filters.searchQuery
      ? searchProducts(filters.searchQuery, limit, skip)
      : filters.selectedCategory
      ? getProductsByCategory(filters.selectedCategory, limit, skip)
      : getProducts(limit, skip);

    request
      .then((data) => {
        setTimeout(() => {
        if (!cancelled) {
          setProducts(data.products);
          setTotal(data.total);
          setLoading(false);
        }
        }, 0); 
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message || "Failed to load products.");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [
    filters.selectedCategory,
    filters.searchQuery,
    filters.currentPage,
    limit,
    retryCount,
  ]);

  const filteredProducts = useMemo(() => {
    const min = filters.minPrice !== "" ? Number(filters.minPrice) : null;
    const max = filters.maxPrice !== "" ? Number(filters.maxPrice) : null;
    const brandsActive = filters.selectedBrands.length > 0;

    return products.filter((p) => {
      if (min !== null && p.price < min) return false;
      if (max !== null && p.price > max) return false;
      if (brandsActive && (!p.brand || !filters.selectedBrands.includes(p.brand)))
        return false;
      return true;
    });
  }, [products, filters.minPrice, filters.maxPrice, filters.selectedBrands]);

  const availableBrands = useMemo(() => {
    const seen = new Set<string>();
    const brands: string[] = [];
    for (const p of products) {
      if (p.brand && !seen.has(p.brand)) {
        seen.add(p.brand);
        brands.push(p.brand);
      }
    }
    return brands.sort();
  }, [products]);

  const totalPages = Math.ceil(total / limit);

  return {
    products,
    filteredProducts,
    total,
    totalPages,
    availableBrands,
    loading,
    error,
    retry,
  };
}