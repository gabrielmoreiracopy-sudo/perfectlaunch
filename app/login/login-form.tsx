"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Flag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUsers, SESSION_COOKIE } from "@/lib/auth-users";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(() => {
    const requestedPath = searchParams.get("next");
    return requestedPath?.startsWith("/") ? requestedPath : "/projects";
  }, [searchParams]);
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");
    const remember = formData.get("remember") === "on";
    const user = mockUsers.find((item) => item.email === email && item.password === password);

    if (!user) {
      setError("E-mail ou senha inválidos.");
      return;
    }

    const cookieMaxAge = remember ? `; max-age=${THIRTY_DAYS}` : "";
    document.cookie = `${SESSION_COOKIE}=${encodeURIComponent(user.email)}; path=/; samesite=lax${cookieMaxAge}`;
    localStorage.setItem(
      "lp_user",
      JSON.stringify({ email: user.email, role: user.role, name: user.name })
    );

    router.replace(nextPath);
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <section className="w-full max-w-md rounded-lg border border-border bg-card p-7 text-card-foreground shadow-premium">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-glow">
            <Flag className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold leading-tight">Lançamento Perfeito</h1>
            <p className="mt-1 text-sm text-muted-foreground">Acesse seu painel de projetos.</p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>

          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              className="h-4 w-4 rounded border-border bg-background accent-sky-500"
              name="remember"
              type="checkbox"
            />
            Permanecer logado
          </label>

          {error ? <p className="rounded-md border border-red-400/25 bg-red-400/10 px-3 py-2 text-sm text-red-200">{error}</p> : null}

          <Button className="w-full" type="submit">
            Entrar
          </Button>
        </form>
      </section>
    </main>
  );
}
