import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { FormField } from "@/components/form-field";
import { PageTitle } from "@/components/page-title";
import { StatusSelect } from "@/components/status-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createPage, createTrackingLink, deleteRecord, updatePage, updateTrackingLink } from "@/lib/actions";
import { getProjectForModule, readProjectId, type SearchProps } from "@/lib/queries";

function buildUtm(url: string, source: string, medium: string, campaign: string) {
  if (!url) return "";
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`;
}

export default async function FunnelPage({ searchParams }: SearchProps) {
  const project = await getProjectForModule(await readProjectId(searchParams));

  return (
    <AppShell>
      <PageTitle title="Funil" description="Controle páginas principais e gere links com UTM." />
      {!project ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Páginas</CardTitle>
              <CardDescription>Captura, obrigado, vendas e outras páginas do funil.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.pages.map((page) => (
                <div key={page.id} className="rounded-md border border-border bg-background/35 p-3">
                  <form action={updatePage} className="space-y-3">
                    <input type="hidden" name="id" value={page.id} />
                    <div className="grid gap-3 md:grid-cols-[1fr_1fr_160px_auto]">
                      <FormField name="name" label="Nome" defaultValue={page.name} />
                      <FormField name="url" label="URL" defaultValue={page.url} />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Status</p>
                        <StatusSelect defaultValue={page.status} />
                      </div>
                      <div className="flex items-end">
                        <Button type="submit" size="sm">Salvar</Button>
                      </div>
                    </div>
                  </form>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <Badge>{page.status}</Badge>
                    <form action={deleteRecord}>
                    <input type="hidden" name="model" value="page" />
                    <input type="hidden" name="id" value={page.id} />
                    <Button type="submit" variant="outline" size="sm">Remover</Button>
                    </form>
                  </div>
                </div>
              ))}
              <form action={createPage} className="grid gap-3 border-t border-border pt-4 md:grid-cols-[1fr_1fr_160px_auto]">
                <input type="hidden" name="projectId" value={project.id} />
                <FormField name="name" label="Nome" placeholder="Captura" />
                <FormField name="url" label="URL" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Status</p>
                  <StatusSelect />
                </div>
                <div className="flex items-end">
                  <Button type="submit">Adicionar</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Links UTM</CardTitle>
              <CardDescription>URLs rastreáveis para campanhas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.trackingLinks.map((link) => (
                <div key={link.id} className="rounded-md border border-border bg-background/35 p-3 text-sm">
                  <form action={updateTrackingLink} className="space-y-3">
                    <input type="hidden" name="id" value={link.id} />
                    <FormField name="name" label="Nome" defaultValue={link.name} />
                    <FormField name="url" label="URL base" defaultValue={link.url} />
                    <div className="grid gap-3 md:grid-cols-3">
                      <FormField name="utmSource" label="utm_source" defaultValue={link.utmSource} />
                      <FormField name="utmMedium" label="utm_medium" defaultValue={link.utmMedium} />
                      <FormField name="utmCampaign" label="utm_campaign" defaultValue={link.utmCampaign} />
                    </div>
                    <p className="break-all text-primary">{buildUtm(link.url, link.utmSource, link.utmMedium, link.utmCampaign)}</p>
                    <Button type="submit" size="sm">Salvar</Button>
                  </form>
                  <form action={deleteRecord} className="mt-3">
                    <input type="hidden" name="model" value="trackingLink" />
                    <input type="hidden" name="id" value={link.id} />
                    <Button type="submit" variant="outline" size="sm">Remover</Button>
                  </form>
                </div>
              ))}
              <form action={createTrackingLink} className="space-y-3 border-t border-border pt-4">
                <input type="hidden" name="projectId" value={project.id} />
                <FormField name="name" label="Nome" />
                <FormField name="url" label="URL base" />
                <div className="grid gap-3 md:grid-cols-3">
                  <FormField name="utmSource" label="utm_source" />
                  <FormField name="utmMedium" label="utm_medium" />
                  <FormField name="utmCampaign" label="utm_campaign" />
                </div>
                <Button type="submit">Criar link</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </AppShell>
  );
}
