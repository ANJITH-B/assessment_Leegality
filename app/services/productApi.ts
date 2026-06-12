import type { Product, ProductsResponse, Category } from "../types/product";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getProducts(
  limit = 12,
  skip = 0,
): Promise<ProductsResponse> {
  const response = await fetch(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}`,
  );
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

export async function getProductsByCategory(
  category: string,
  limit = 12,
  skip = 0,
): Promise<ProductsResponse> {
  const response = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`,
  );
  if (!response.ok) throw new Error("Failed to fetch products by category");
  return response.json();
}

export async function searchProducts(
  query: string,
  limit = 12,
  skip = 0,
): Promise<ProductsResponse> {
  const response = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
  );
  if (!response.ok) throw new Error("Failed to search products");
  return response.json();
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
}
