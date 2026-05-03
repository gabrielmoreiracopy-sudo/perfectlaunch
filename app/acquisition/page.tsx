import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { FormField } from "@/components/form-field";
import { PageTitle } from "@/components/page-title";
import { StatusSelect } from "@/components/status-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createCreative, deleteRecord, updateCreative } from "@/lib/actions";
import { getProjectForModule, readProjectId, type SearchProps } from "@/lib/queries";

export default async function AcquisitionPage({ searchParams }: SearchProps) {
  const project = await getProjectForModule(await readProjectId(searchParams));

  return (
    <AppShell projectId={project?.id}>
      <PageTitle title="Aquisição" description="Organize criativos, ângulos, hooks e links de tráfego." />
      {!project ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <div className="space-y-4">
            {project.creatives.map((creative) => (
              <Card key={creative.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>{creative.name}</CardTitle>
                      <CardDescription>
                        {creative.platform} · {creative.format}
                      </CardDescription>
                    </div>
                    <Badge>{creative.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <form action={updateCreative} className="space-y-3">
                    <input type="hidden" name="id" value={creative.id} />
                    <div className="grid gap-3 md:grid-cols-3">
                      <FormField name="name" label="Nome" defaultValue={creative.name} />
                      <FormField name="platform" label="Plataforma" defaultValue={creative.platform} />
                      <FormField name="format" label="Formato" defaultValue={creative.format} />
                    </div>
                    <FormField name="angle" label="Ângulo" defaultValue={creative.angle} />
                    <FormField name="hook" label="Hook" defaultValue={creative.hook} />
                    <FormField name="copy" label="Copy" defaultValue={creative.copy} textarea />
                    <FormField name="link" label="Link" defaultValue={creative.link} />
                    <div className="max-w-xs space-y-2">
                      <p className="text-sm font-medium">Status</p>
                      <StatusSelect defaultValue={creative.status} />
                    </div>
                    <Button type="submit" size="sm">Salvar</Button>
                  </form>
                  <form action={deleteRecord} className="mt-3">
                    <input type="hidden" name="model" value="creative" />
                    <input type="hidden" name="id" value={creative.id} />
                    <Button type="submit" variant="outline" size="sm">Remover</Button>
                  </form>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Novo criativo</CardTitle>
              <CardDescription>Cadastre uma peça de aquisição.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={createCreative} className="space-y-4">
                <input type="hidden" name="projectId" value={project.id} />
                <FormField name="name" label="Nome" />
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField name="platform" label="Plataforma" />
                  <FormField name="format" label="Formato" />
                </div>
                <FormField name="angle" label="Ângulo" />
                <FormField name="hook" label="Hook" />
                <FormField name="copy" label="Copy" textarea />
                <FormField name="link" label="Link" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Status</p>
                  <StatusSelect />
                </div>
                <Button type="submit" className="w-full">Criar criativo</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </AppShell>
  );
}
