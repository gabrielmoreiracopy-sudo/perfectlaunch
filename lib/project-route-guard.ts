import { redirect } from "next/navigation";

import { getActiveProject } from "@/lib/queries";

export async function assertProjectRoute(projectId: string) {
  const project = await getActiveProject(projectId);
  if (!project) redirect("/projects");
  return project;
}
