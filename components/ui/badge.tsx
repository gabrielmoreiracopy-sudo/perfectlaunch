import * as React from "react";

import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  Pendente: "border-luxury-goldBorder/45 bg-transparent text-luxury-secondary",
  "Em andamento": "border-luxury-goldBorder bg-luxury-gold/10 text-luxury-gold",
  Concluído: "border-luxury-goldBorder/60 bg-luxury-gold/10 text-luxury-gold",
  ADMIN: "border-luxury-goldBorder/35 bg-transparent text-luxury-muted",
  VIEWER: "border-luxury-goldBorder/35 bg-transparent text-luxury-muted",
  novo: "border-luxury-goldBorder/35 bg-transparent text-luxury-secondary",
  "em conversa": "border-luxury-goldBorder bg-luxury-gold/10 text-luxury-gold",
  fechado: "border-luxury-goldBorder/60 bg-luxury-gold/10 text-luxury-gold",
  perdido: "border-red-400/35 bg-red-400/10 text-red-200"
};

export function Badge({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const value = typeof children === "string" ? children : "";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[value] ?? "border-luxury-goldBorder/35 bg-transparent text-luxury-secondary",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
