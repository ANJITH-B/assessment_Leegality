import { useEffect, useState } from "react";
import { getProduct } from "../services/productApi";
import type { Product } from "../types/product";

interface UseProductResult {
  product: Product | null;

  selectedImage: string;
  setSelectedImage: (url: string) => void;

  originalPrice: string | null;
  loading: boolean;
  error: string | null;
}

export function useProduct(id: string | undefined): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No product ID provided.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    setLoading(true);
    setError(null);
    setProduct(null);

    getProduct(id)
      .then((data) => {
        if (!cancelled) {
          setProduct(data);
          setSelectedImage(data.thumbnail);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message || "Failed to load product.");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const originalPrice =
    product && product.discountPercentage > 0
      ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
      : null;

  return { product, selectedImage, setSelectedImage, originalPrice, loading, error };
}
