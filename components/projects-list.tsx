"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { RestoreProjectForm } from "@/components/restore-project-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getProjectInitials,
  isValidLogo,
  LOCAL_PROJECTS_KEY,
  normalizeProject,
  type NormalizedProject
} from "@/lib/project-normalize";
import { formatCurrency, formatDate } from "@/lib/utils";

export function ProjectsList({
  initialProjects,
  isAdmin
}: {
  initialProjects: NormalizedProject[];
  isAdmin: boolean;
}) {
  const [localProjects, setLocalProjects] = useState<NormalizedProject[]>([]);

  useEffect(() => {
    function loadProjects() {
      setLocalProjects(readLocalProjects());
    }

    loadProjects();
    window.addEventListener("storage", loadProjects);
    window.addEventListener("lp-projects-updated", loadProjects);

    return () => {
      window.removeEventListener("storage", loadProjects);
      window.removeEventListener("lp-projects-updated", loadProjects);
    };
  }, []);

  const projects = useMemo(() => mergeProjects(localProjects, initialProjects), [initialProjects, localProjects]);
  const localProjectIds = useMemo(() => new Set(localProjects.map((project) => project.id)), [localProjects]);
  const activeProjects = projects.filter((project) => !project.archived);
  const archivedProjects = projects.filter((project) => project.archived);

  return (
    <div className="space-y-10">
      {activeProjects.length ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {activeProjects.map((project) => (
            <ProjectCard key={project.id} project={project} isAdmin={isAdmin} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold">Nenhum projeto ativo</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Quando um projeto estiver disponível, ele aparecerá aqui.
            </p>
          </CardContent>
        </Card>
      )}

      {archivedProjects.length ? (
        <section className="border-t border-luxury-border pt-7">
          <h2 className="text-2xl font-semibold">Projetos arquivados</h2>
          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            {archivedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isAdmin={isAdmin} archived isLocal={localProjectIds.has(project.id)} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function ProjectCard({
  project,
  isAdmin,
  archived = false
  isLocal = false
}: {
  project: NormalizedProject;
  isAdmin: boolean;
  archived?: boolean;
  isLocal?: boolean;
}) {
  const ctaLabel = isAdmin ? "Abrir projeto" : "Visualizar projeto";

  return (
    <Card className={archived ? "bg-luxury-card opacity-60" : "bg-luxury-card hover:bg-luxury-elevated"}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 gap-4">
            <ProjectLogo logo={project.logo} name={project.name} />
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="truncate text-2xl font-semibold">{project.name}</h3>
                <Badge>{archived ? "Arquivado" : project.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{project.expert}</p>
              <p className="mt-1 text-sm text-muted-foreground">{project.launchType}</p>
            </div>
          </div>

          {archived ? (
            isAdmin ? <ProjectRestoreButton project={project} isLocal={isLocal} /> : null
          ) : (
            <Button asChild size="sm" variant={isAdmin ? "default" : "outline"}>
              <Link href={`/project/${project.id}`}>{ctaLabel}</Link>
            </Button>
          )}
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
}

function ProjectRestoreButton({ project, isLocal }: { project: NormalizedProject; isLocal: boolean }) {
  if (!isLocal) return <RestoreProjectForm projectId={project.id} />;
  return (
    <Button type="button" size="sm" variant="outline" onClick={() => restoreLocalProject(project.id)}>
      Restaurar
    </Button>
  );
}

function ProjectLogo({ logo, name }: { logo: string | null; name: string }) {
  const [failed, setFailed] = useState(false);
  const showLogo = !failed && isValidLogo(logo);

  return (
    <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-luxury-goldBorder/70 bg-luxury-elevated font-serif text-2xl font-semibold text-primary shadow-glow">
      {showLogo ? (
        <img alt={`Logo de ${name}`} className="h-full w-full object-cover" src={logo || ""} onError={() => setFailed(true)} />
      ) : (
        getProjectInitials(name)
      )}
    </div>
  );
}

function mergeProjects(localProjects: NormalizedProject[], initialProjects: NormalizedProject[]) {
  const seen = new Set<string>();
  return [...localProjects, ...initialProjects]
    .map((project) => normalizeProject(project))
    .filter((project) => {
      if (seen.has(project.id)) return false;
      seen.add(project.id);
      return true;
    });
}

function readLocalProjects() {
  try {
    const parsed = JSON.parse(localStorage.getItem(LOCAL_PROJECTS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.map((project) => normalizeProject(project)) : [];
  } catch {
    return [];
  }
}

function restoreLocalProject(projectId: string) {
  const projects = readLocalProjects().map((project) => (project.id === projectId ? { ...project, archived: false } : project));
  localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(projects));
  window.dispatchEvent(new Event("lp-projects-updated"));
}
