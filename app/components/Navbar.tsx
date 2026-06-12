import { useState } from "react";
import Button from "./ui/button";
import { useFilters } from "~/context/FilterContext";

export default function Navbar() {
  const { filters, setSearch } = useFilters();
  const [localQuery, setLocalQuery] = useState(filters.searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(localQuery);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/95 shadow-xl shadow-slate-950/10 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="hidden md:block">
          <Button variant="icon" type="button" aria-label="Menu">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
        </div>

        <form className="flex mx-auto" onSubmit={handleSearch}>
          <label className="relative flex  items-center w-[400px] lg:w-xl">
            <span className="pointer-events-none absolute left-4 text-slate-400">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              type="text"
              className="w-full rounded border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="Search products..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
            />
          </label>
        </form>
        <div className="hidden md:block">
          <div className="ml-auto flex items-center gap-2 w-full justify-end ">
            <Button variant="icon" type="button" aria-label="Cart">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </Button>
            <Button variant="icon" type="button" aria-label="History">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </Button>
            <Button variant="icon" type="button" aria-label="Account">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
