"use client";

import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { createProject } from "@/lib/actions";

const MAX_LOGO_SIZE = 512 * 1024;

export function ProjectCreateModal() {
  const [open, setOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState("");
  const [logoError, setLogoError] = useState("");
  const [projectName, setProjectName] = useState("");

  const initials = useMemo(() => {
    const words = projectName.trim().split(/\s+/).filter(Boolean);
    const letters = words.length > 1 ? `${words[0][0]}${words[1][0]}` : words[0]?.slice(0, 2);
    return (letters || "LP").toUpperCase();
  }, [projectName]);

  function resetModal() {
    setLogoPreview("");
    setLogoError("");
    setProjectName("");
  }

  function closeModal() {
    resetModal();
    setOpen(false);
  }

  function handleLogoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setLogoError("");

    if (!file) {
      setLogoPreview("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setLogoPreview("");
      setLogoError("Escolha um arquivo de imagem.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_LOGO_SIZE) {
      setLogoPreview("");
      setLogoError("Use uma imagem de até 512 KB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(typeof reader.result === "string" ? reader.result : "");
    };
    reader.onerror = () => {
      setLogoPreview("");
      setLogoError("Não foi possível carregar a logo.");
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Criar Projeto
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-luxury-black/80 px-4 py-8 backdrop-blur-md">
          <section className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-lg border border-luxury-goldBorder/45 bg-card p-7 text-card-foreground shadow-premium">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold">Criar novo projeto</h2>
                <p className="mt-1 text-sm text-muted-foreground">Configure a base do lançamento.</p>
              </div>
              <button
                aria-label="Fechar modal"
                className="rounded-md p-2 text-muted-foreground transition hover:bg-luxury-elevated hover:text-primary"
                type="button"
                onClick={closeModal}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form action={createProject} className="space-y-5">
              <input name="status" type="hidden" value="Pendente" />
              <input name="logoUrl" type="hidden" value={logoPreview} />

              <div className="grid gap-4">
                <Field label="Nome do projeto" name="name" required onChange={(value) => setProjectName(value)} />
                <Field label="Nome do expert" name="expert" required />
                <div className="space-y-2">
                  <Label htmlFor="launchType">Tipo do lançamento</Label>
                  <Select id="launchType" name="launchType" defaultValue="Clássico" required>
                    <option value="Clássico">Clássico</option>
                    <option value="Semente">Semente</option>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="logoFile">Logo do projeto (opcional)</Label>
                  <div className="flex items-center gap-4">
                    <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-luxury-goldBorder/70 bg-luxury-elevated font-serif text-xl font-semibold text-primary shadow-glow">
                      {logoPreview ? <img alt="Preview da logo" className="h-full w-full object-cover" src={logoPreview} /> : initials}
                    </div>
                    <Input id="logoFile" type="file" accept="image/*" onChange={handleLogoChange} />
                  </div>
                  {logoError ? <p className="text-sm text-red-200">{logoError}</p> : null}
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-luxury-border pt-5 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={Boolean(logoError)}>
                  Criar projeto
                </Button>
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
  required,
  onChange
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} onChange={(event) => onChange?.(event.target.value)} />
    </div>
  );
}
