import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/page.tsx"),
  route("products", "routes/product-list/page.tsx"),
  route("product/:id", "routes/product-detail/page.tsx"),
] satisfies RouteConfig;
