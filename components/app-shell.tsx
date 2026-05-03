import Link from "next/link";
import {
  Archive,
  BarChart3,
  FileText,
  Flag,
  FolderKanban,
  Megaphone,
  MessageSquare,
  Package,
  Route,
  Target,
  Users
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { getActiveProject } from "@/lib/queries";

const navItems = [
  { href: "/", label: "Dashboard", icon: BarChart3 },
  { href: "/projects", label: "Projetos", icon: FolderKanban },
  { href: "/strategy", label: "Estratégia", icon: Target },
  { href: "/offer", label: "Oferta", icon: Package },
  { href: "/content", label: "Conteúdo", icon: FileText },
  { href: "/acquisition", label: "Aquisição", icon: Megaphone },
  { href: "/funnel", label: "Funil", icon: Route },
  { href: "/communication", label: "Comunicação", icon: MessageSquare },
  { href: "/recovery", label: "Recuperação", icon: Users },
  { href: "/files", label: "Arquivos", icon: Archive }
];

export async function AppShell({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const project = await getActiveProject();
  const canCreateProject = user?.role === "admin";

  return (
    <div className="min-h-screen text-foreground">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-border bg-card/95 px-4 py-5 shadow-premium backdrop-blur md:block">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-glow">
            <Flag className="h-5 w-5" />
          </div>
          <div>
            <p className="font-serif text-base font-semibold leading-tight">Lançamento Perfeito</p>
            <p className="text-xs text-muted-foreground">Hub premium de lançamentos</p>
          </div>
        </Link>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={project && item.href !== "/" && item.href !== "/projects" ? `${item.href}?projectId=${project.id}` : item.href}
                className="flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-sm text-muted-foreground transition hover:border-border hover:bg-secondary hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-10 border-b border-border bg-background/88 backdrop-blur-xl">
          <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 px-5 py-3">
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">Projeto ativo</p>
              <h1 className="text-xl font-semibold">{project?.name ?? "Nenhum projeto criado"}</h1>
            </div>
            <div className="flex items-center gap-2">
              {project ? <Badge>{project.status}</Badge> : null}
              {user ? <Badge>{user.role === "admin" ? "ADMIN" : "VIEWER"}</Badge> : null}
              {canCreateProject ? (
                <Button asChild size="sm">
                  <Link href="/projects">Criar Projeto</Link>
                </Button>
              ) : null}
              {project ? (
                <Button asChild variant="outline" size="sm">
                  <Link href={`/projects/${project.id}`}>Visão geral</Link>
                </Button>
              ) : null}
              <Button asChild variant="outline" size="sm">
                <Link href="/logout" prefetch={false}>Sair</Link>
              </Button>
            </div>
          </div>
        </header>
        <main className="px-5 py-7">{children}</main>
      </div>
    </div>
  );
}
