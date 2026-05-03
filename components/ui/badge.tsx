import * as React from "react";

import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  Pendente: "border-amber-400/25 bg-amber-400/10 text-amber-200",
  "Em andamento": "border-sky-400/25 bg-sky-400/10 text-sky-200",
  Concluído: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  novo: "border-slate-400/25 bg-slate-400/10 text-slate-200",
  "em conversa": "border-sky-400/25 bg-sky-400/10 text-sky-200",
  fechado: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  perdido: "border-red-400/25 bg-red-400/10 text-red-200"
};

export function Badge({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const value = typeof children === "string" ? children : "";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[value] ?? "border-slate-400/25 bg-slate-400/10 text-slate-200",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
