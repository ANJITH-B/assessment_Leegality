import { useFilters } from "../../hooks/useFilters";
import { useProducts } from "../../hooks/useProducts";
import FilterSidebar from "../../components/filter/page";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import { SkeletonCard } from "../../components/LoadingGrid";
import Layout from "./layout";
import MessageState from "../../components/ErrorMessage";

const ITEMS_PER_PAGE = 6;

export function meta() {
  return [
    { title: "Products | ShopHub" },
    { name: "description", content: "Browse and filter our full product catalogue." },
  ];
}

export default function ProductList() {
  const { filters, setPage } = useFilters();
  const { filteredProducts, totalPages, availableBrands, loading, error, retry, } = useProducts(filters, { limit: ITEMS_PER_PAGE });

  return (
    <Layout>
      <Layout.Sidebar>
        <FilterSidebar availableBrands={availableBrands} />
      </Layout.Sidebar>
      <Layout.Body>
        {!loading && !error && (
          <p className="text-sm text-slate-600">
            {filters.searchQuery ? (
              <>
                Results for <strong className="text-slate-950">"{filters.searchQuery}"</strong> —{' '}
              </>
            ) : null}
            <span className="font-semibold text-slate-950">
              {filteredProducts.length > 0
                ? `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`
                : "No products found"}
            </span>
          </p>
        )}

        {error && <MessageState variant="error" message={error} onRetry={retry} />}
        {!loading && !error && filteredProducts.length === 0 && (
          <MessageState variant="empty" message="No products match your filters." onRetry={retry} />
        )}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {loading &&
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          {!loading && !error && filteredProducts.length > 0 && filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          currentPage={filters.currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />

      </Layout.Body>
    </Layout>
  );
}