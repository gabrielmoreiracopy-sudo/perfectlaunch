"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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

  const projects = useMemo(() => {
    const seen = new Set<string>();
    return [...localProjects, ...initialProjects]
      .map((project) => normalizeProject(project))
      .filter((project) => {
        if (project.archived || seen.has(project.id)) return false;
        seen.add(project.id);
        return true;
      });
  }, [initialProjects, localProjects]);

  if (!projects.length) {
    return (
      <Card>
        <CardContent className="p-8">
          <h3 className="text-xl font-semibold">Nenhum projeto liberado</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Quando um projeto estiver disponível para este usuário, ele aparecerá aqui.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {projects.map((project) => {
        const ctaLabel = isAdmin ? "Abrir projeto" : "Visualizar projeto";

        return (
          <Card key={project.id} className="bg-luxury-card hover:bg-luxury-elevated">
            <CardContent className="p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex min-w-0 gap-4">
                  <ProjectLogo logo={project.logo} name={project.name} />
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

function readLocalProjects() {
  try {
    const parsed = JSON.parse(localStorage.getItem(LOCAL_PROJECTS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.map((project) => normalizeProject(project)).filter((project) => !project.archived) : [];
  } catch {
    return [];
  }
}
