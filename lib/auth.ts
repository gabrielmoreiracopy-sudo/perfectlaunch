import { cookies } from "next/headers";

import { mockUsers, SESSION_COOKIE, type AuthUser } from "@/lib/auth-users";

export type PublicUser = Omit<AuthUser, "password">;

export function sanitizeUser(user: AuthUser): PublicUser {
  const { password: _password, ...safeUser } = user;
  return safeUser;
}

export function findUserByEmail(email?: string | null) {
  return mockUsers.find((user) => user.email === email);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const email = cookieStore.get(SESSION_COOKIE)?.value;
  const user = findUserByEmail(email);
  return user ? sanitizeUser(user) : null;
}

export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === "admin";
}

export async function assertAdmin() {
  if (!(await isAdmin())) {
    throw new Error("Usuário sem permissão para editar este recurso.");
  }
}
