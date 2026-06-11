import React, { createContext, useContext, useState, useCallback } from "react";

export interface FilterState {
  selectedCategory: string;
  minPrice: string;
  maxPrice: string;
  selectedBrands: string[];
  searchQuery: string;
  currentPage: number;
}

interface FilterContextType {
  filters: FilterState;
  setCategory: (category: string) => void;
  setPriceRange: (min: string, max: string) => void;
  toggleBrand: (brand: string) => void;
  setSearch: (query: string) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  selectedCategory: "",
  minPrice: "",
  maxPrice: "",
  selectedBrands: [],
  searchQuery: "",
  currentPage: 1,
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const setCategory = useCallback((category: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedCategory: category,
      selectedBrands: [],
      currentPage: 1,
    }));
  }, []);

  const setPriceRange = useCallback((min: string, max: string) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max, currentPage: 1 }));
  }, []);

  const toggleBrand = useCallback((brand: string) => {
    setFilters((prev) => {
      const already = prev.selectedBrands.includes(brand);
      return {
        ...prev,
        selectedBrands: already
          ? prev.selectedBrands.filter((b) => b !== brand)
          : [...prev.selectedBrands, brand],
        currentPage: 1,
      };
    });
  }, []);

  const setSearch = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query, currentPage: 1, selectedCategory: "" }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <FilterContext.Provider
      value={{ filters, setCategory, setPriceRange, toggleBrand, setSearch, setPage, resetFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function   useFilters(): FilterContextType {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used inside FilterProvider");
  return ctx;
}
