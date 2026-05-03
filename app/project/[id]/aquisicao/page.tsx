import AcquisitionPage from "@/app/acquisition/page";
import { assertProjectRoute } from "@/lib/project-route-guard";

export default async function ProjectAcquisitionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await assertProjectRoute(id);
  return <AcquisitionPage searchParams={Promise.resolve({ projectId: id })} />;
}
