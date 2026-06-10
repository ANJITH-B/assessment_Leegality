const BASE_URL = "https://dummyjson.com";

export async function getProducts(
  limit = 12,
  skip = 0
) {
  const response = await fetch(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProduct(id: string) {
  const response = await fetch(
    `${BASE_URL}/products/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function getCategories() {
  const response = await fetch(
    `${BASE_URL}/products/categories`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}