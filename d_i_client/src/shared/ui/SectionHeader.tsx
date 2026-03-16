import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
}

export default function SectionHeader({ title, subtitle, eyebrow, align = "left", className, ...props }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-2 mb-8",
        align === "center" && "text-center mx-auto",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <p className={cn("text-xs font-semibold uppercase tracking-widest text-primary/70 flex items-center gap-2", align === "center" && "justify-center")}>
          <span className="inline-block w-5 h-px bg-primary/40 rounded-full" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      {subtitle ? (
        <p className={cn("text-muted-foreground max-w-prose", align === "center" && "mx-auto")}>{subtitle}</p>
      ) : null}
    </div>
  );
}
