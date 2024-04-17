import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        success:
          "border-transparent bg-green-200 text-green-600 hover:bg-green-200/80",
        alert:
          "border-transparent bg-yellow-200 text-yellow-600 hover:bg-yellow-200/80",
        failed:
          "border-transparent bg-red-200 text-red-600 hover:bg-red-200/80",
        lime: "border-transparent bg-lime-200 text-lime-600 hover:bg-lime-200/80",
        emerald:
          "border-transparent bg-emerald-200 text-emerald-600 hover:bg-emerald-200/80",
        sky: "border-transparent bg-sky-200 text-sky-600 hover:bg-sky-200/80",
        violet:
          "border-transparent bg-violet-200 text-violet-600 hover:bg-violet-200/80",
        fuchsia:
          "border-transparent bg-fuchsia-200 text-fuchsia-600 hover:bg-fuchsia-200/80",
        rose: "border-transparent bg-rose-200 text-rose-600 hover:bg-rose-200/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
