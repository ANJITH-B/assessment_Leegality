import { cn, tv, type VariantProps } from "tailwind-variants";

const typography = tv({
    base: "tracking-tight",
    variants: {
        variant: {
            h1: "text-4xl font-semibold text-slate-950 sm:text-5xl",
            h2: "text-2xl font-semibold text-slate-950",
            h3: "text-xl font-semibold text-slate-950",
            body: "text-base text-slate-700",
            label: "text-sm font-semibold text-slate-900",
            caption: "text-sm text-slate-500",

            title: "text-lg font-semibold text-slate-950",
            subtitle: "text-md font-medium text-slate-700",
        },
        weight: {
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
        },
    },
    defaultVariants: {
        variant: "body",
        weight: "normal",
    },
});

export function Typography({
    className,
    variant,
    weight,
    asChild = false,
    ...props
}: React.ComponentProps<'p'> &
    VariantProps<typeof typography> & {
        asChild?: boolean
    }) {
    const Comp = 'p'

    return (
        <Comp
            data-slot="p"
            className={cn(typography({ variant, weight, className }))}
            {...props}
        />
    )
}


// 

// heading: "",
// subheading: "",

//     body: "", // category text, product description
//     bodySmall: "", rating number


//     title: "", // product title, reviewer name
//     subtitle: "",

//     label: "", 
//     caption: "",