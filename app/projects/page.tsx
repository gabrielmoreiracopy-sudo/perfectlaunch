import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { FormField } from "@/components/form-field";
import { PageTitle } from "@/components/page-title";
import { StatusSelect } from "@/components/status-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createProject } from "@/lib/actions";
import { prisma } from "@/lib/db";
import { demoProject } from "@/lib/demo-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } }).catch(() => [demoProject]);

  return (
    <AppShell>
      <PageTitle title="Projetos" description="Crie e acompanhe os lançamentos planejados." />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>
                      {project.expert} · {project.launchType}
                    </CardDescription>
                  </div>
                  <Badge>{project.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-[1fr_auto]">
                <div className="grid gap-3 text-sm md:grid-cols-3">
                  <div>
                    <p className="text-muted-foreground">Produto</p>
                    <p className="font-medium">{project.product}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Meta</p>
                    <p className="font-medium">{formatCurrency(project.revenueGoal)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Carrinho</p>
                    <p className="font-medium">{formatDate(project.openCartDate)}</p>
                  </div>
                </div>
                <Button asChild size="sm">
                  <Link href={`/projects/${project.id}`}>Gerenciar</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Novo Projeto</CardTitle>
            <CardDescription>Dados básicos do lançamento.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createProject} className="space-y-4">
              <FormField name="name" label="Nome do projeto" placeholder="Ex: Lançamento Perfeito" />
              <FormField name="expert" label="Especialista" />
              <FormField name="product" label="Produto" />
              <FormField name="launchType" label="Tipo de lançamento" placeholder="Interno, perpétuo, semente..." />
              <div className="space-y-2">
                <p className="text-sm font-medium">Status</p>
                <StatusSelect />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField name="revenueGoal" label="Meta R$" type="number" />
                <FormField name="leadsGoal" label="Meta leads" type="number" />
                <FormField name="budget" label="Verba R$" type="number" />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField name="startDate" label="Início" type="date" />
                <FormField name="openCartDate" label="Abre carrinho" type="date" />
                <FormField name="closeCartDate" label="Fecha carrinho" type="date" />
              </div>
              <Button type="submit" className="w-full">Criar projeto</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
