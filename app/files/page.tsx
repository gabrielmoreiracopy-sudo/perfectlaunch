import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { FormField } from "@/components/form-field";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileLink, deleteRecord, updateFileLink } from "@/lib/actions";
import { getProjectForModule, readProjectId, type SearchProps } from "@/lib/queries";

export default async function FilesPage({ searchParams }: SearchProps) {
  const project = await getProjectForModule(await readProjectId(searchParams));

  return (
    <AppShell>
      <PageTitle title="Arquivos" description="Links rápidos para documentos, roteiros, páginas e materiais." />
      {!project ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <div className="grid gap-4 md:grid-cols-2">
            {project.files.map((file) => (
              <Card key={file.id}>
                <CardHeader>
                  <CardTitle>{file.name}</CardTitle>
                  <CardDescription>{file.type || "Sem categoria"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form action={updateFileLink} className="space-y-3">
                    <input type="hidden" name="id" value={file.id} />
                    <FormField name="name" label="Nome" defaultValue={file.name} />
                    <FormField name="type" label="Categoria" defaultValue={file.type} />
                    <FormField name="url" label="URL" defaultValue={file.url} />
                    <FormField name="description" label="Descrição" defaultValue={file.description} textarea />
                    <Button type="submit" size="sm">Salvar</Button>
                  </form>
                  <form action={deleteRecord} className="mt-3">
                    <input type="hidden" name="model" value="fileLink" />
                    <input type="hidden" name="id" value={file.id} />
                    <Button type="submit" variant="outline" size="sm">Remover</Button>
                  </form>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Novo link</CardTitle>
              <CardDescription>Adicione um material de apoio.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={createFileLink} className="space-y-4">
                <input type="hidden" name="projectId" value={project.id} />
                <FormField name="name" label="Nome" />
                <FormField name="type" label="Categoria" />
                <FormField name="url" label="URL" />
                <FormField name="description" label="Descrição" textarea />
                <Button type="submit" className="w-full">Adicionar arquivo</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </AppShell>
  );
}
