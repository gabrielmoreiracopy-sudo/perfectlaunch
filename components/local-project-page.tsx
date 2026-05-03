"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { PageTitle } from "@/components/page-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LOCAL_PROJECTS_KEY, normalizeProject, type NormalizedProject } from "@/lib/project-normalize";
import { formatDate } from "@/lib/utils";

export function LocalProjectPage({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [project, setProject] = useState<NormalizedProject | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const projects = readProjects();
    const current = projects.find((item) => item.id === projectId && !item.archived) || null;

    if (!current) {
      router.replace("/projects");
      return;
    }

    setProject(current);
    setLoaded(true);
  }, [projectId, router]);

  if (!loaded) return null;
  if (!project) return null;

  function deleteLocalProject() {
    const projects = readProjects().filter((item) => item.id !== projectId);
    localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event("lp-projects-updated"));
    router.replace("/projects");
  }

  return (
    <main className="min-h-screen px-6 py-8 text-foreground">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/projects">Voltar para projetos</Link>
          </Button>
          <Badge>{project.status}</Badge>
        </div>

        <PageTitle title={project.name} description="Visão geral do projeto." />

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>Expert</CardDescription>
              <CardTitle>{project.expert}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Tipo</CardDescription>
              <CardTitle>{project.launchType}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Criado em</CardDescription>
              <CardTitle>{formatDate(project.createdAt)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Excluir projeto</CardTitle>
            <CardDescription>Remove este projeto salvo localmente.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button type="button" variant="destructive" onClick={deleteLocalProject}>
              Excluir
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function readProjects() {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(localStorage.getItem(LOCAL_PROJECTS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.map((item) => normalizeProject(item)) : [];
  } catch {
    return [];
  }
}
