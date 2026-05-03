import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { FormField } from "@/components/form-field";
import { PageTitle } from "@/components/page-title";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createMessage, deleteRecord, updateMessage } from "@/lib/actions";
import { getProjectForModule, readProjectId, type SearchProps } from "@/lib/queries";
import { formatDate } from "@/lib/utils";

function dateValue(value?: Date | null) {
  return value ? value.toISOString().slice(0, 10) : "";
}

export default async function CommunicationPage({ searchParams }: SearchProps) {
  const project = await getProjectForModule(await readProjectId(searchParams));

  return (
    <AppShell projectId={project?.id}>
      <PageTitle title="Comunicação" description="Planeje emails e mensagens de WhatsApp por fase da campanha." />
      {!project ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <div className="space-y-4">
            {project.messages.map((message) => (
              <Card key={message.id}>
                <CardHeader>
                  <CardTitle>{message.phase || "Mensagem sem fase"}</CardTitle>
                  <CardDescription>
                    {message.channel} · {formatDate(message.sendDate)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form action={updateMessage} className="space-y-3">
                    <input type="hidden" name="id" value={message.id} />
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Canal</p>
                        <Select name="channel" defaultValue={message.channel}>
                          <option value="email">email</option>
                          <option value="whatsapp">whatsapp</option>
                        </Select>
                      </div>
                      <FormField name="phase" label="Fase" defaultValue={message.phase} />
                      <FormField name="sendDate" label="Data de envio" type="date" defaultValue={dateValue(message.sendDate)} />
                    </div>
                    <FormField name="objective" label="Objetivo" defaultValue={message.objective} textarea />
                    <FormField name="content" label="Conteúdo" defaultValue={message.content} textarea />
                    <FormField name="cta" label="CTA" defaultValue={message.cta} />
                    <FormField name="link" label="Link" defaultValue={message.link} />
                    <Button type="submit" size="sm">Salvar</Button>
                  </form>
                  <form action={deleteRecord} className="mt-3">
                    <input type="hidden" name="model" value="message" />
                    <input type="hidden" name="id" value={message.id} />
                    <Button type="submit" variant="outline" size="sm">Remover</Button>
                  </form>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Nova mensagem</CardTitle>
              <CardDescription>Crie uma comunicação para a sequência.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={createMessage} className="space-y-4">
                <input type="hidden" name="projectId" value={project.id} />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Canal</p>
                  <Select name="channel" defaultValue="email">
                    <option value="email">email</option>
                    <option value="whatsapp">whatsapp</option>
                  </Select>
                </div>
                <FormField name="phase" label="Fase" />
                <FormField name="objective" label="Objetivo" textarea />
                <FormField name="content" label="Conteúdo" textarea />
                <FormField name="cta" label="CTA" />
                <FormField name="link" label="Link" />
                <FormField name="sendDate" label="Data de envio" type="date" />
                <Button type="submit" className="w-full">Criar mensagem</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </AppShell>
  );
}
