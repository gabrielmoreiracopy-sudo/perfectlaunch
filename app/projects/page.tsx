import Link from "next/link";
import { Flag } from "lucide-react";

import { ProjectCreateModal } from "@/components/project-create-modal";
import { ProjectsList } from "@/components/projects-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { demoProject } from "@/lib/demo-data";
import { normalizeProject } from "@/lib/project-normalize";

type ProjectCardData = typeof demoProject & {
  logo?: string | null;
  logoUrl?: string | null;
  notes?: string | null;
};

function getVisibleProjects(projects: ProjectCardData[], user: Awaited<ReturnType<typeof getCurrentUser>>) {
  if (user?.role !== "viewer") return projects;
  const allowedNames = user.allowedProjectNames || [];
  return projects.filter((project) => allowedNames.includes(project.name || ""));
}

export default async function ProjectsPage() {
  const user = await getCurrentUser();
  const loadedProjects = await prisma.project.findMany({ where: { archived: false }, orderBy: { createdAt: "desc" } }).catch(() => [demoProject]);
  const projects = Array.isArray(loadedProjects) ? loadedProjects : [];
  const visibleProjects = getVisibleProjects(projects as ProjectCardData[], user).map((project) => normalizeProject(project));
  const isAdmin = user?.role === "admin";

  return (
    <main className="min-h-screen px-6 py-8 text-foreground">
      <header className="mb-12 flex flex-wrap items-center justify-between gap-4">
        <Link href="/projects" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-luxury-goldBorder bg-luxury-elevated text-primary shadow-glow">
            <Flag className="h-5 w-5" />
          </div>
          <div>
            <p className="font-serif text-lg font-semibold leading-tight">Lançamento Perfeito</p>
            <p className="text-xs text-muted-foreground">Hub premium de lançamentos</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          {user ? <Badge>{user.role === "admin" ? "ADMIN" : "VIEWER"}</Badge> : null}
          <Button asChild variant="outline" size="sm">
            <Link href="/logout" prefetch={false}>
              Sair
            </Link>
          </Button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl">
        <section className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-5xl font-semibold leading-[0.95]">Meus Projetos</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              Gerencie seus lançamentos, campanhas e projetos estratégicos.
            </p>
          </div>
          {isAdmin ? <ProjectCreateModal /> : null}
        </section>

        <ProjectsList initialProjects={visibleProjects} isAdmin={isAdmin} />
      </div>
    </main>
  );
}
