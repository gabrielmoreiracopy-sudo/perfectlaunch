import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { FormField } from "@/components/form-field";
import { PageTitle } from "@/components/page-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { createLead, deleteRecord, updateLead } from "@/lib/actions";
import { getProjectForModule, readProjectId, type SearchProps } from "@/lib/queries";

export default async function RecoveryPage({ searchParams }: SearchProps) {
  const project = await getProjectForModule(await readProjectId(searchParams));

  return (
    <AppShell>
      <PageTitle title="Recuperação" description="Acompanhe leads, conversas, objeções e fechamento." />
      {!project ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <div className="grid gap-4 md:grid-cols-2">
            {project.leads.map((lead) => (
              <Card key={lead.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>{lead.name}</CardTitle>
                      <CardDescription>{lead.contact}</CardDescription>
                    </div>
                    <Badge>{lead.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <form action={updateLead} className="space-y-3">
                    <input type="hidden" name="id" value={lead.id} />
                    <FormField name="name" label="Nome" defaultValue={lead.name} />
                    <FormField name="contact" label="Contato" defaultValue={lead.contact} />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Status</p>
                      <Select name="status" defaultValue={lead.status}>
                        <option value="novo">novo</option>
                        <option value="em conversa">em conversa</option>
                        <option value="fechado">fechado</option>
                        <option value="perdido">perdido</option>
                      </Select>
                    </div>
                    <FormField name="temperature" label="Temperatura" defaultValue={lead.temperature} />
                    <FormField name="objection" label="Objeção" defaultValue={lead.objection} textarea />
                    <FormField name="notes" label="Observações" defaultValue={lead.notes} textarea />
                    <Button type="submit" size="sm">Salvar</Button>
                  </form>
                  <form action={deleteRecord} className="mt-3">
                    <input type="hidden" name="model" value="lead" />
                    <input type="hidden" name="id" value={lead.id} />
                    <Button type="submit" variant="outline" size="sm">Remover</Button>
                  </form>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Novo lead</CardTitle>
              <CardDescription>Registre contatos para recuperação.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={createLead} className="space-y-4">
                <input type="hidden" name="projectId" value={project.id} />
                <FormField name="name" label="Nome" />
                <FormField name="contact" label="Contato" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Status</p>
                  <Select name="status" defaultValue="novo">
                    <option value="novo">novo</option>
                    <option value="em conversa">em conversa</option>
                    <option value="fechado">fechado</option>
                    <option value="perdido">perdido</option>
                  </Select>
                </div>
                <FormField name="temperature" label="Temperatura" />
                <FormField name="objection" label="Objeção" textarea />
                <FormField name="notes" label="Observações" textarea />
                <Button type="submit" className="w-full">Criar lead</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </AppShell>
  );
}
