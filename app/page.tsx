import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/page-title";
import { prisma } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { contents: true, creatives: true, leads: true }
  });

  const activeProjects = projects.filter((project) => project.status !== "Concluído").length;
  const revenueGoal = projects.reduce((sum, project) => sum + project.revenueGoal, 0);
  const leadsGoal = projects.reduce((sum, project) => sum + project.leadsGoal, 0);

  return (
    <AppShell>
      <PageTitle title="Dashboard" description="Visão rápida dos lançamentos, metas e próximos marcos." />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Projetos ativos</CardDescription>
            <CardTitle className="text-3xl">{activeProjects}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Meta de faturamento</CardDescription>
            <CardTitle className="text-3xl">{formatCurrency(revenueGoal)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Meta de leads</CardDescription>
            <CardTitle className="text-3xl">{leadsGoal.toLocaleString("pt-BR")}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Projetos</h3>
        <Button asChild>
          <Link href="/projects">Novo Projeto</Link>
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.product}</CardDescription>
                </div>
                <Badge>{project.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 text-sm md:grid-cols-3">
                <div>
                  <p className="text-muted-foreground">Abertura</p>
                  <p className="font-medium">{formatDate(project.openCartDate)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Leads</p>
                  <p className="font-medium">{project.leadsGoal.toLocaleString("pt-BR")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Meta</p>
                  <p className="font-medium">{formatCurrency(project.revenueGoal)}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button asChild size="sm">
                  <Link href={`/projects/${project.id}`}>Abrir</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/strategy?projectId=${project.id}`}>Estratégia</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
