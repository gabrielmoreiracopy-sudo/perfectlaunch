import Link from "next/link";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { FormField } from "@/components/form-field";
import { PageTitle } from "@/components/page-title";
import { StatusSelect } from "@/components/status-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteProject, updateProject } from "@/lib/actions";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { demoProjectFull } from "@/lib/demo-data";
import { formatCurrency, formatDate } from "@/lib/utils";

function dateValue(value?: Date | null) {
  return value ? value.toISOString().slice(0, 10) : "";
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  const project = await prisma.project
    .findUnique({
      where: { id },
      include: {
        contents: true,
        creatives: true,
        pages: true,
        messages: true,
        leads: true,
        files: true
      }
    })
    .catch(() => demoProjectFull);

  if (!project) notFound();
  if (user?.role === "viewer" && !user.allowedProjectNames?.includes(project.name)) notFound();

  const totalItems =
    project.contents.length +
    project.creatives.length +
    project.pages.length +
    project.messages.length +
    project.leads.length +
    project.files.length;
  const completedItems =
    project.contents.filter((item) => item.status === "Concluído").length +
    project.creatives.filter((item) => item.status === "Concluído").length +
    project.pages.filter((item) => item.status === "Concluído").length;
  const progress = totalItems ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <AppShell>
      <PageTitle title={project.name} description="Visão geral, progresso e próximos passos do lançamento." />

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Status</CardDescription>
            <Badge>{project.status}</Badge>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Meta</CardDescription>
            <CardTitle>{formatCurrency(project.revenueGoal)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Leads</CardDescription>
            <CardTitle>{project.leadsGoal.toLocaleString("pt-BR")}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Progresso</CardDescription>
            <CardTitle>{progress}%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Card>
          <CardHeader>
            <CardTitle>Dados principais</CardTitle>
            <CardDescription>Atualize as informações centrais do projeto.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={updateProject} className="space-y-4">
              <input type="hidden" name="projectId" value={project.id} />
              <FormField name="name" label="Nome" defaultValue={project.name} />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField name="expert" label="Especialista" defaultValue={project.expert} />
                <FormField name="product" label="Produto" defaultValue={project.product} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField name="logoUrl" label="URL da logo" defaultValue={project.logoUrl} />
                <FormField name="notes" label="Observações iniciais" defaultValue={project.notes} textarea />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField name="launchType" label="Tipo" defaultValue={project.launchType} />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Status</p>
                  <StatusSelect defaultValue={project.status} />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField name="revenueGoal" label="Meta R$" type="number" defaultValue={project.revenueGoal} />
                <FormField name="leadsGoal" label="Meta leads" type="number" defaultValue={project.leadsGoal} />
                <FormField name="budget" label="Verba R$" type="number" defaultValue={project.budget} />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField name="startDate" label="Início" type="date" defaultValue={dateValue(project.startDate)} />
                <FormField name="openCartDate" label="Abre carrinho" type="date" defaultValue={dateValue(project.openCartDate)} />
                <FormField name="closeCartDate" label="Fecha carrinho" type="date" defaultValue={dateValue(project.closeCartDate)} />
              </div>
              <Button type="submit">Salvar alterações</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Próximos passos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Link className="block rounded-md border border-border bg-background/35 p-3 transition hover:bg-secondary" href={`/strategy?projectId=${project.id}`}>
                Revisar estratégia e promessa ROMA
              </Link>
              <Link className="block rounded-md border border-border bg-background/35 p-3 transition hover:bg-secondary" href={`/content?projectId=${project.id}`}>
                Finalizar CPLs e VSL
              </Link>
              <Link className="block rounded-md border border-border bg-background/35 p-3 transition hover:bg-secondary" href={`/funnel?projectId=${project.id}`}>
                Conferir páginas e links UTM
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Datas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Início: <strong>{formatDate(project.startDate)}</strong></p>
              <p>Abertura: <strong>{formatDate(project.openCartDate)}</strong></p>
              <p>Fechamento: <strong>{formatDate(project.closeCartDate)}</strong></p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Excluir projeto</CardTitle>
              <CardDescription>Remove o lançamento e todos os dados relacionados.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={deleteProject}>
                <input type="hidden" name="projectId" value={project.id} />
                <Button type="submit" variant="destructive">Excluir</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
