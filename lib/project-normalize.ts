export const LOCAL_PROJECTS_KEY = "lp_projects";

export type NormalizedProject = {
  id: string;
  name: string;
  expert: string;
  launchType: string;
  logo: string | null;
  status: "Em andamento";
  createdAt: number;
  launchSetupCompleted: false;
  archived: boolean;
  product: string;
  revenueGoal: number;
  openCartDate: string | null;
};

function safeText(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function safeNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export function isValidLogo(value: unknown) {
  if (typeof value !== "string") return false;
  const logo = value.trim();
  return logo.startsWith("data:image/") || logo.startsWith("https://") || logo.startsWith("http://");
}

export function normalizeProject(project: unknown): NormalizedProject {
  const source = toRecord(project);
  const logo = source.logo ?? source.logoUrl;

  return {
    id: safeText(source.id, cryptoSafeId()),
    name: safeText(source.name, "Projeto sem nome"),
    expert: safeText(source.expert, "Expert a definir"),
    launchType: safeText(source.launchType, "Clássico"),
    logo: isValidLogo(logo) ? String(logo).trim() : null,
    status: "Em andamento",
    createdAt: normalizeDate(source.createdAt),
    launchSetupCompleted: false,
    archived: source.archived === true,
    product: safeText(source.product, "Oferta a definir"),
    revenueGoal: safeNumber(source.revenueGoal),
    openCartDate: normalizeOptionalDate(source.openCartDate)
  };
}

export function getProjectInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? `${words[0][0]}${words[1][0]}` : words[0]?.slice(0, 2);
  return (letters || "LP").toUpperCase();
}

function normalizeDate(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.getTime();
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date.getTime();
  }
  return Date.now();
}

function normalizeOptionalDate(value: unknown) {
  if (!value) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString();
  if (typeof value === "string" && value.trim()) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date.toISOString();
  }
  return null;
}

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function cryptoSafeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `project-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
