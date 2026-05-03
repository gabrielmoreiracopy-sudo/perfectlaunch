import Link from "next/link";
import {
  Archive,
  BarChart3,
  FileText,
  Flag,
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
  { path: "", label: "Dashboard do projeto", icon: BarChart3 },
  { path: "estrategia", label: "Estratégia", icon: Target },
  { path: "oferta", label: "Oferta", icon: Package },
  { path: "conteudo", label: "Conteúdo", icon: FileText },
  { path: "aquisicao", label: "Aquisição", icon: Megaphone },
  { path: "funil", label: "Funil", icon: Route },
  { path: "comunicacao", label: "Comunicação", icon: MessageSquare },
  { path: "recuperacao", label: "Recuperação", icon: Users },
  { path: "arquivos", label: "Arquivos", icon: Archive }
];

export async function AppShell({
  children,
  projectId
}: {
  children: React.ReactNode;
  projectId?: string;
}) {
  const user = await getCurrentUser();
  const project = await getActiveProject(projectId);
  const projectBasePath = project ? `/project/${project.id}` : "/projects";

  return (
    <div className="min-h-screen text-foreground">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-luxury-border bg-luxury-night/95 px-4 py-6 shadow-premium backdrop-blur md:block">
        <Link href="/projects" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-luxury-goldBorder bg-luxury-elevated text-primary shadow-glow">
            <Flag className="h-5 w-5" />
          </div>
          <div>
            <p className="font-serif text-lg font-semibold leading-tight">Lançamento Perfeito</p>
            <p className="text-xs text-muted-foreground">Hub premium de lançamentos</p>
          </div>
        </Link>

        <nav className="mt-10 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const href = item.path ? `${projectBasePath}/${item.path}` : projectBasePath;

            return (
              <Link
                key={item.path || "dashboard"}
                href={href}
                className="flex items-center gap-3 rounded-md border border-transparent px-3 py-2.5 text-sm text-muted-foreground transition hover:border-luxury-goldBorder/60 hover:bg-luxury-elevated hover:text-primary"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-10 border-b border-luxury-border bg-luxury-black/88 backdrop-blur-xl">
          <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 px-6 py-3.5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Projeto ativo</p>
              <h1 className="text-2xl font-semibold">{project?.name ?? "Nenhum projeto selecionado"}</h1>
            </div>
            <div className="flex items-center gap-2">
              {project ? <Badge>{project.status}</Badge> : null}
              {user ? <Badge>{user.role === "admin" ? "ADMIN" : "VIEWER"}</Badge> : null}
              <Button asChild variant="outline" size="sm">
                <Link href="/projects">Voltar para projetos</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/logout" prefetch={false}>
                  Sair
                </Link>
              </Button>
            </div>
          </div>
        </header>
        <main className="px-6 py-9">{children}</main>
      </div>
    </div>
  );
}
