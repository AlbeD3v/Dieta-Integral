import * as React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
}

export default function Chip({ className, active = false, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "border-transparent text-white bg-[linear-gradient(130deg,#1B4332_0%,#2D6A4F_25%,#40916C_50%,#2D6A4F_75%,#1B4332_100%)] shadow-sm"
          : "border-border text-muted-foreground hover:border-foreground/30",
        className
      )}
      {...props}
    />
  );
}
