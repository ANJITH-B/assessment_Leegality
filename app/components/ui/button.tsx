import { createElement } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

 const button = tv({
  base: "inline-flex items-center rounded justify-center gap-2 font-semibold transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      primary: "bg-slate-950 text-white hover:bg-slate-800",
      secondary: "bg-slate-100 text-slate-950 hover:bg-slate-200",
      ghost: "bg-transparent text-slate-950 hover:bg-slate-100 flex justify-between",
      danger: "bg-red-700 text-white hover:bg-red-700",
      outline:
        "border border-slate-200 bg-white text-slate-950 hover:bg-slate-50",
    },
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2.5 text-sm",
      lg: "px-5 py-3 text-base",
    },
    fullWidth: {
      true: "w-full ",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    fullWidth: false,
  },
});

export type ButtonProps = VariantProps<typeof button>;

type Props = {
  children?: React.ReactNode;
  variant?: VariantProps<typeof button>["variant"];
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: VariantProps<typeof button>["size"];
  fullWidth?: boolean;
};

const Button = ({
  children,
  variant,
  className,
  onClick,
  type,
  size,
  disabled,
  fullWidth,
}: Props) => {
  return createElement(
    "button",
    {
      onClick,
      className: cn(button({ variant, size, fullWidth }), className),
      disabled,
      type,
    },
    children, 
  );
};

export default Button;