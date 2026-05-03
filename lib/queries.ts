import { prisma } from "@/lib/db";
import { demoProject, demoProjectFull } from "@/lib/demo-data";

export async function getActiveProject(projectId?: string) {
  try {
    if (projectId) {
      const selected = await prisma.project.findUnique({ where: { id: projectId } });
      if (selected) return selected;
    }
    return await prisma.project.findFirst({ orderBy: { createdAt: "desc" } });
  } catch {
    return demoProject;
  }
}

export async function getProjectForModule(projectId?: string) {
  const project = await getActiveProject(projectId);
  if (!project) return null;

  try {
    return await prisma.project.findUnique({
      where: { id: project.id },
      include: {
        strategy: true,
        offer: true,
        contents: true,
        creatives: true,
        pages: true,
        trackingLinks: true,
        messages: true,
        leads: true,
        files: true
      }
    });
  } catch {
    return demoProjectFull;
  }
}

export type SearchProps = {
  searchParams: Promise<{ projectId?: string }>;
};

export async function readProjectId(searchParams?: SearchProps["searchParams"]) {
  const params = await searchParams;
  return params?.projectId;
}
