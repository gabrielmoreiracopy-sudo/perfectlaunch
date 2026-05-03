import Link from "next/link";
import {
  Archive,
  BarChart3,
  Briefcase,
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
  const project = await getActiveProject();

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r bg-white px-4 py-5 md:block">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Flag className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Lançamento Perfeito</p>
            <p className="text-xs text-muted-foreground">Central de campanha</p>
          </div>
        </Link>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={project && item.href !== "/" && item.href !== "/projects" ? `${item.href}?projectId=${project.id}` : item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
          <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 px-5 py-3">
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">Projeto ativo</p>
              <h1 className="text-lg font-semibold">{project?.name ?? "Nenhum projeto criado"}</h1>
            </div>
            <div className="flex items-center gap-2">
              {project ? <Badge>{project.status}</Badge> : null}
              <Button asChild size="sm">
                <Link href="/projects">Novo Projeto</Link>
              </Button>
              {project ? (
                <Button asChild variant="outline" size="sm">
                  <Link href={`/projects/${project.id}`}>Visão geral</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </header>
        <main className="px-5 py-6">{children}</main>
      </div>
    </div>
  );
}
