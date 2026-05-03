import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { demoProject, demoProjectFull } from "@/lib/demo-data";

function canViewProject(projectName: string, user: Awaited<ReturnType<typeof getCurrentUser>>) {
  if (user?.role !== "viewer") return true;
  return Boolean(user.allowedProjectNames?.includes(projectName));
}

export async function getActiveProject(projectId?: string) {
  const user = await getCurrentUser();

  try {
    if (projectId) {
      const selected = await prisma.project.findUnique({ where: { id: projectId } });
      if (selected && canViewProject(selected.name, user)) return selected;
      return null;
    }
    const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
    return projects.find((project) => canViewProject(project.name, user)) || null;
  } catch {
    return canViewProject(demoProject.name, user) ? demoProject : null;
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
