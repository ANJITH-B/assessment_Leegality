import { useEffect, useState } from "react";
import { getProduct } from "../services/productApi";
import type { Product } from "../types/product";

interface UseProductResult {
  product: Product | null;
  /** The currently displayed image URL (starts as thumbnail, changes on thumb click) */
  selectedImage: string;
  setSelectedImage: (url: string) => void;
  /**
   * Original (pre-discount) price formatted to 2 decimal places.
   * null when the product has no discount or hasn't loaded yet.
   */
  originalPrice: string | null;
  loading: boolean;
  error: string | null;
}

/**
 * useProduct
 *
 * Fetches a single product by ID from the DummyJSON API.
 * Manages the selected gallery image and derives the original (pre-discount) price.
 *
 * @param id  Product ID string taken from the route param
 */
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

  // Derive original (pre-discount) price
  const originalPrice =
    product && product.discountPercentage > 0
      ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
      : null;

  return { product, selectedImage, setSelectedImage, originalPrice, loading, error };
}
