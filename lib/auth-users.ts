export const SESSION_COOKIE = "lp_session";

export type UserRole = "admin" | "viewer";

export type AuthUser = {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  allowedProjectNames?: string[];
};

export const mockUsers: AuthUser[] = [
  {
    email: "admin@lancamentoperfeito.com",
    password: "admin123",
    role: "admin",
    name: "Admin"
  },
  {
    email: "cliente@lancamentoperfeito.com",
    password: "cliente123",
    role: "viewer",
    name: "Cliente",
    allowedProjectNames: ["Lançamento Perfeito - Turma Piloto", "Lançamento Perfeito - Demo"]
  }
];
