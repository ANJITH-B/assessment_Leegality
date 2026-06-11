import { useState } from "react";
import Button from "../ui/button";


const FilterLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <aside className="sticky top-16 h-[calc(100vh-4rem)] hidden w-80 shrink-0 border-r bg-slate-50  border-slate-200 xl:block">
            {children}
        </aside>
    )
}

const FilterHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="p-5 space-y-2 bg-slate-50 border-b border-slate-200">
            {children}
        </div>
    )
}

const FilterContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="overflow-y-auto h-[calc(100%-120px)]">
            {children}
        </div>
    );
};


const Section = ({ children, title, isLoading }: { children: React.ReactNode; title: string; isLoading?: boolean }) => {
    const [open, setOpen] = useState(true);

    return (
        <div className="space-y-3 border-b border-slate-200 bg-slate-50">
            <Button type="button" variant="ghost" fullWidth onClick={() => setOpen((o) => !o)} aria-expanded={open}>
                <span>{title}</span>
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`h-3 w-3 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </Button>
            {isLoading && (
                <div className="space-y-4 px-5">
                    {Array.from({ length: 10 }, (_, idx) => (
                        <div key={idx} className="h-5 w-full rounded bg-slate-200 animate-pulse" />
                    ))}
                    <div className="h-5 w-full rounded bg-slate-200 animate-pulse" />
                </div>
            )}
            {open && (
                <div className="space-y-3 pb-5">
                    {children}
                </div>
            )}
        </div>
    )
}

FilterLayout.Section = Section;
FilterLayout.Header = FilterHeader;
FilterLayout.Content = FilterContent;

export default FilterLayout;