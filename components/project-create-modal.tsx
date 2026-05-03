"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/lib/actions";

export function ProjectCreateModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Criar Projeto
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-luxury-black/80 px-4 py-8 backdrop-blur-md">
          <section className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-luxury-goldBorder/45 bg-card p-7 text-card-foreground shadow-premium">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold">Criar novo projeto</h2>
                <p className="mt-1 text-sm text-muted-foreground">Configure a base do lançamento para começar a operação.</p>
              </div>
              <button
                aria-label="Fechar modal"
                className="rounded-md p-2 text-muted-foreground transition hover:bg-luxury-elevated hover:text-primary"
                type="button"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form action={createProject} className="space-y-5">
              <input name="status" type="hidden" value="Pendente" />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Nome do projeto" name="name" required />
                <Field label="Nome do especialista/cliente" name="expert" required />
                <Field label="Produto/oferta" name="product" required />
                <div className="space-y-2">
                  <Label htmlFor="launchType">Tipo de lançamento</Label>
                  <Select id="launchType" name="launchType" defaultValue="Clássico">
                    <option value="Clássico">Clássico</option>
                    <option value="Semente">Semente</option>
                  </Select>
                </div>
                <Field label="Nicho" name="niche" />
                <Field label="Meta de faturamento" name="revenueGoal" type="number" />
                <Field label="Meta de leads" name="leadsGoal" type="number" />
                <Field label="Data de abertura do carrinho" name="openCartDate" type="date" />
                <Field label="Data de fechamento do carrinho" name="closeCartDate" type="date" />
                <Field label="Logo do projeto ou URL da logo" name="logoUrl" type="url" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Observações iniciais</Label>
                <Textarea id="notes" name="notes" />
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-luxury-border pt-5 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Criar projeto</Button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} />
    </div>
  );
}
