import { tv } from "tailwind-variants";
import Button from "./ui/button";

interface MessageStateProps {
  variant?: "error" | "empty";
  message?: string;
  onRetry?: () => void;
}

const messageState = tv({
  slots: {
    container: "rounded p-6 text-center shadow-sm space-y-3",
    iconWrapper:
      "mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded",
    text: "text-sm font-medium text-slate-900",
  },
  variants: {
    variant: {
      error: {
        container: "border border-red-100 bg-red-50/80",
        iconWrapper: "bg-red-100 text-red-600",
      },
      empty: {
        container: "border border-slate-200 bg-slate-50",
        iconWrapper: "bg-slate-100 text-slate-500",
      },
    },
  },
  defaultVariants: {
    variant: "error",
  },
});

export default function MessageState({
  variant = "error",
  message,
  onRetry,
}: MessageStateProps) {
  const styles = messageState({ variant });

  return (
    <div className={styles.container()}>
      <div className={styles.iconWrapper()}>
        {variant === "error" ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        ) : (
          <SearchIcon />
        )}
      </div>

      <p className={styles.text()}>
        {message ??
          (variant === "error"
            ? "Something went wrong. Please try again."
            : "No products match your filters.")}
      </p>

      {onRetry && (
        <Button
          type="button"
          variant={variant === "error" ? "danger" : "outline"}
          onClick={onRetry}
        >
          {variant === "error" ? "Try Again" : "Retry"}
        </Button>
      )}
    </div>
  );
}

const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
