import { prisma } from "@/lib/db";

export async function getActiveProject(projectId?: string) {
  if (projectId) {
    const selected = await prisma.project.findUnique({ where: { id: projectId } });
    if (selected) return selected;
  }
  return prisma.project.findFirst({ orderBy: { createdAt: "desc" } });
}

export async function getProjectForModule(projectId?: string) {
  const project = await getActiveProject(projectId);
  if (!project) return null;

  return prisma.project.findUnique({
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
}

export type SearchProps = {
  searchParams: Promise<{ projectId?: string }>;
};

export async function readProjectId(searchParams?: SearchProps["searchParams"]) {
  const params = await searchParams;
  return params?.projectId;
}
