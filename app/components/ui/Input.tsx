

const SearchInput = () => {
    return (
        <div>
          <div className="relative px-4 py-3 text-sm text-slate-600 border bg-white border-slate-200">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search..."
              readOnly
              className="w-full bg-transparent pl-10 text-sm text-slate-700 outline-none"
            />
          </div>
        </div>
    )
}

export default SearchInput
