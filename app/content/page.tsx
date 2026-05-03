import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { FormField } from "@/components/form-field";
import { PageTitle } from "@/components/page-title";
import { StatusSelect } from "@/components/status-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { saveContent } from "@/lib/actions";
import { getProjectForModule, readProjectId, type SearchProps } from "@/lib/queries";

const types = ["CPL1", "CPL2", "CPL3", "VSL"];

export default async function ContentPage({ searchParams }: SearchProps) {
  const project = await getProjectForModule(await readProjectId(searchParams));

  return (
    <AppShell projectId={project?.id}>
      <PageTitle title="Conteúdo" description="Planeje CPL1, CPL2, CPL3 e VSL com objetivo, roteiro e chamada." />
      {!project ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4">
          {types.map((type) => {
            const content = project.contents.find((item) => item.type === type);
            if (!content) return null;
            return (
              <Card key={content.id}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardTitle>{type}</CardTitle>
                      <CardDescription>Peça de conteúdo do lançamento.</CardDescription>
                    </div>
                    <Badge>{content.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <form action={saveContent} className="space-y-4">
                    <input type="hidden" name="id" value={content.id} />
                    <FormField name="objective" label="Objetivo" defaultValue={content.objective} textarea />
                    <FormField name="script" label="Roteiro" defaultValue={content.script} textarea />
                    <FormField name="cta" label="CTA" defaultValue={content.cta} />
                    <div className="max-w-xs space-y-2">
                      <p className="text-sm font-medium">Status</p>
                      <StatusSelect defaultValue={content.status} />
                    </div>
                    <Button type="submit">Salvar {type}</Button>
                  </form>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
