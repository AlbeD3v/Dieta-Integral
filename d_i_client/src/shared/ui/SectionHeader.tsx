import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeader({ title, subtitle, align = "left", className, ...props }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-2 mb-8",
        align === "center" && "text-center mx-auto",
        className
      )}
      {...props}
    >
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      {subtitle ? (
        <p className="text-muted-foreground max-w-prose md:mx-auto">{subtitle}</p>
      ) : null}
    </div>
  );
}
