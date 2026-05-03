"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { archiveProject } from "@/lib/actions";

export function ArchiveProjectForm({ projectId }: { projectId: string }) {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!window.confirm("Tem certeza que deseja arquivar este projeto?")) {
      event.preventDefault();
      return;
    }

    router.replace("/projects");
  }

  return (
    <form action={archiveProject} onSubmit={handleSubmit}>
      <input type="hidden" name="projectId" value={projectId} />
      <Button type="submit" variant="destructive">
        Arquivar projeto
      </Button>
    </form>
  );
}
