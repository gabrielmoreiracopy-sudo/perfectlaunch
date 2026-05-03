import FilesPage from "@/app/files/page";
import { assertProjectRoute } from "@/lib/project-route-guard";

export default async function ProjectFilesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await assertProjectRoute(id);
  return <FilesPage searchParams={Promise.resolve({ projectId: id })} />;
}
