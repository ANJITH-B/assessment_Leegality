import { useEffect, useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import SearchInput from "../ui/Input";
import FilterLayout from "./layout";
import Button from "../ui/button";
import { useFilters } from "~/context/FilterContext";

interface FilterSidebarProps {
  availableBrands: string[];
}

export default function FilterSidebar({ availableBrands }: FilterSidebarProps) {
  const { filters, setCategory, setPriceRange, toggleBrand, resetFilters } =
    useFilters();
  const { categories, loading } = useCategories();
  const [localMin, setLocalMin] = useState(filters.minPrice);
  const [localMax, setLocalMax] = useState(filters.maxPrice);

  useEffect(() => {
    setLocalMin(filters.minPrice);
    setLocalMax(filters.maxPrice);
  }, [filters.minPrice, filters.maxPrice]);

  const handleApplyPrice = () => {
    setPriceRange(localMin, localMax);
  };

  const hasActiveFilters =
    filters.selectedCategory ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.selectedBrands.length > 0;

  return (
    <FilterLayout>
      <FilterLayout.Header>
        <SearchInput />
        {hasActiveFilters && (
          <Button
            type="button"
            variant="danger"
            size="sm"
            fullWidth
            onClick={resetFilters}
          >
            Clear All Filters
          </Button>
        )}
      </FilterLayout.Header>
      <FilterLayout.Content>
        <FilterLayout.Section title="Categories" isLoading={loading}>
          <ul className="space-y-0 2xl:space-x-1">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <label className="flex cursor-pointer items-center gap-3 px-5 py-2 text-sm text-slate-700 transition hover:bg-slate-200">
                  <input
                    type="checkbox"
                    checked={filters.selectedCategory === cat.slug}
                    onChange={() =>
                      setCategory(
                        filters.selectedCategory === cat.slug ? "" : cat.slug,
                      )
                    }
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{cat.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </FilterLayout.Section>

        <FilterLayout.Section title="Price Range">
          <div className="px-5 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="number"
                min="0"
                value={localMin}
                onChange={(e) => setLocalMin(e.target.value)}
                placeholder="Min"
                className="w-full  rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              <input
                type="number"
                min="0"
                value={localMax}
                onChange={(e) => setLocalMax(e.target.value)}
                placeholder="Max"
                className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              fullWidth
              onClick={handleApplyPrice}
            >
              Apply
            </Button>
          </div>
        </FilterLayout.Section>

        {availableBrands.length > 0 && (
          <FilterLayout.Section title="Brands" isLoading={loading}>
            <ul className="space-y-0 2xl:space-y-2">
              {availableBrands.map((brand) => (
                <li key={brand}>
                  <label className="flex cursor-pointer items-center gap-3 px-5 py-2 text-sm text-slate-700 transition hover:bg-slate-200">
                    <input
                      type="checkbox"
                      checked={filters.selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{brand}</span>
                  </label>
                </li>
              ))}
            </ul>
          </FilterLayout.Section>
        )}
      </FilterLayout.Content>
    </FilterLayout>
  );
}
