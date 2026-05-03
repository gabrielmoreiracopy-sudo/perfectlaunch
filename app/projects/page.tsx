import Link from "next/link";
import { Flag } from "lucide-react";

import { ProjectCreateModal } from "@/components/project-create-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { demoProject } from "@/lib/demo-data";
import { formatCurrency, formatDate } from "@/lib/utils";

type ProjectCardData = typeof demoProject & {
  logoUrl?: string | null;
  notes?: string | null;
};

function getVisibleProjects(projects: ProjectCardData[], user: Awaited<ReturnType<typeof getCurrentUser>>) {
  if (user?.role !== "viewer") return projects;
  const allowedNames = user.allowedProjectNames || [];
  return projects.filter((project) => allowedNames.includes(project.name));
}

export default async function ProjectsPage() {
  const user = await getCurrentUser();
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } }).catch(() => [demoProject]);
  const visibleProjects = getVisibleProjects(projects as ProjectCardData[], user);
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

        {visibleProjects.length ? (
          <div className="grid gap-5 xl:grid-cols-2">
            {visibleProjects.map((project) => {
              const initial = project.name?.trim().charAt(0).toUpperCase() || "L";
              const ctaLabel = isAdmin ? "Abrir projeto" : "Visualizar projeto";

              return (
                <Card key={project.id} className="bg-luxury-card hover:bg-luxury-elevated">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div className="flex min-w-0 gap-4">
                        <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-luxury-goldBorder/70 bg-luxury-elevated font-serif text-2xl font-semibold text-primary shadow-glow">
                          {project.logoUrl ? (
                            <img alt={`Logo de ${project.name}`} className="h-full w-full object-cover" src={project.logoUrl} />
                          ) : (
                            initial
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-2xl font-semibold">{project.name}</h3>
                            <Badge>{project.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{project.expert}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{project.launchType}</p>
                        </div>
                      </div>

                      <Button asChild size="sm" variant={isAdmin ? "default" : "outline"}>
                        <Link href={`/project/${project.id}`}>{ctaLabel}</Link>
                      </Button>
                    </div>

                    <div className="mt-6 grid gap-4 border-t border-luxury-border pt-5 text-sm md:grid-cols-3">
                      <div>
                        <p className="text-muted-foreground">Produto/oferta</p>
                        <p className="mt-1 font-medium">{project.product}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Meta de faturamento</p>
                        <p className="mt-1 font-medium">{formatCurrency(project.revenueGoal)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Abertura do carrinho</p>
                        <p className="mt-1 font-medium">{formatDate(project.openCartDate)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold">Nenhum projeto liberado</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Quando um projeto estiver disponível para este usuário, ele aparecerá aqui.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
