"use client";

import { Button } from "@/components/ui/button";
import { restoreProject } from "@/lib/actions";

export function RestoreProjectForm({ projectId }: { projectId: string }) {
  return (
    <form action={restoreProject}>
      <input type="hidden" name="projectId" value={projectId} />
      <Button type="submit" size="sm" variant="outline">
        Restaurar
      </Button>
    </form>
  );
}
