import { useEffect, useState } from "react";
import { getCategories } from "../services/productApi";
import type { Category } from "../types/product";

interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    getCategories()
      .then((data) => {
        if (!cancelled) {
          const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
          setCategories(sorted);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message || "Failed to load categories.");
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);  

  return { categories, loading, error };
}

