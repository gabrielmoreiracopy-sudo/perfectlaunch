import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { FormField } from "@/components/form-field";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { upsertStrategy } from "@/lib/actions";
import { getProjectForModule, readProjectId, type SearchProps } from "@/lib/queries";

export default async function StrategyPage({ searchParams }: SearchProps) {
  const project = await getProjectForModule(await readProjectId(searchParams));
  const strategy = project?.strategy;

  return (
    <AppShell>
      <PageTitle title="Estratégia" description="Clareza de mercado, avatar, objeções e promessa ROMA." />
      {!project ? (
        <EmptyState />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>Preencha a base estratégica do lançamento.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={upsertStrategy} className="space-y-4">
              <input type="hidden" name="projectId" value={project.id} />
              <FormField name="niche" label="Nicho" defaultValue={strategy?.niche} textarea />
              <FormField name="avatar" label="Avatar" defaultValue={strategy?.avatar} textarea />
              <FormField name="pains" label="Dores" defaultValue={strategy?.pains} textarea />
              <FormField name="desires" label="Desejos" defaultValue={strategy?.desires} textarea />
              <FormField name="objections" label="Objeções" defaultValue={strategy?.objections} textarea />
              <FormField name="promise" label="Promessa (Roma)" defaultValue={strategy?.promise} textarea />
              <Button type="submit">Salvar estratégia</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </AppShell>
  );
}
