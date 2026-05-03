import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { FormField } from "@/components/form-field";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { upsertOffer } from "@/lib/actions";
import { getProjectForModule, readProjectId, type SearchProps } from "@/lib/queries";

export default async function OfferPage({ searchParams }: SearchProps) {
  const project = await getProjectForModule(await readProjectId(searchParams));
  const offer = project?.offer;

  return (
    <AppShell projectId={project?.id}>
      <PageTitle title="Oferta" description="Estruture entregáveis, bônus, preço, garantia e mecanismo." />
      {!project ? (
        <EmptyState />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>Oferta principal do lançamento.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={upsertOffer} className="space-y-4">
              <input type="hidden" name="projectId" value={project.id} />
              <FormField name="name" label="Nome da oferta" defaultValue={offer?.name} />
              <FormField name="deliverables" label="Entregáveis" defaultValue={offer?.deliverables} textarea />
              <FormField name="bonuses" label="Bônus" defaultValue={offer?.bonuses} textarea />
              <FormField name="price" label="Preço" type="number" defaultValue={offer?.price} />
              <FormField name="guarantee" label="Garantia" defaultValue={offer?.guarantee} textarea />
              <FormField name="mechanism" label="Mecanismo" defaultValue={offer?.mechanism} textarea />
              <Button type="submit">Salvar oferta</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </AppShell>
  );
}
