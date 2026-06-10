import { type RouteConfig, index, route } from "@react-router/dev/routes";

// export default [index("routes/home.tsx")] satisfies RouteConfig;


export default [
  route("products", "routes/product-list.tsx"),
  route("product/:id", "routes/product-detail.tsx"),
] satisfies RouteConfig;