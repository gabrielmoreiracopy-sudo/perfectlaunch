"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { deleteProject } from "@/lib/actions";

export function DeleteProjectForm({ projectId }: { projectId: string }) {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!window.confirm("Tem certeza que deseja excluir este projeto?")) {
      event.preventDefault();
      return;
    }

    router.replace("/projects");
  }

  return (
    <form action={deleteProject} onSubmit={handleSubmit}>
      <input type="hidden" name="projectId" value={projectId} />
      <Button type="submit" variant="destructive">
        Excluir
      </Button>
    </form>
  );
}
