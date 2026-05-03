import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value?: number | null) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(typeof value === "number" && Number.isFinite(value) ? value : 0);
}

export function formatDate(value?: Date | string | number | null) {
  if (!value) return "Sem data";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "Sem data";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(date);
}

export function toDate(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string") return null;
  return value ? new Date(`${value}T00:00:00`) : null;
}

export function toNumber(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string") return 0;
  return Number(value.replace(",", ".")) || 0;
}

export function toText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}
