import * as React from "react";

import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  Pendente: "border-amber-200 bg-amber-50 text-amber-700",
  "Em andamento": "border-blue-200 bg-blue-50 text-blue-700",
  Concluído: "border-emerald-200 bg-emerald-50 text-emerald-700",
  novo: "border-slate-200 bg-slate-50 text-slate-700",
  "em conversa": "border-blue-200 bg-blue-50 text-blue-700",
  fechado: "border-emerald-200 bg-emerald-50 text-emerald-700",
  perdido: "border-red-200 bg-red-50 text-red-700"
};

export function Badge({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const value = typeof children === "string" ? children : "";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[value] ?? "border-slate-200 bg-slate-50 text-slate-700",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
