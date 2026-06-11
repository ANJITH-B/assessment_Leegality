import { tv } from "tailwind-variants";


export const card = tv({
  base: "rounded-[1.5rem] border border-slate-200 bg-white shadow-sm",
  variants: {
    padding: {
      sm: "p-4",
      md: "p-5",
      lg: "p-6",
    },
  },
  defaultVariants: {
    padding: "md",
  },
});

export const badge = tv({
  base: "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
  variants: {
    color: {
      neutral: "bg-slate-100 text-slate-700",
      success: "bg-emerald-100 text-emerald-700",
      warning: "bg-amber-100 text-amber-700",
      danger: "bg-red-600 text-white",
      primary: "bg-indigo-600 text-white",
    },
  },
  defaultVariants: {
    color: "neutral",
  },
});


