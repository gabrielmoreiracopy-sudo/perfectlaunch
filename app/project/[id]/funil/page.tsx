import FunnelPage from "@/app/funnel/page";
import { assertProjectRoute } from "@/lib/project-route-guard";

export default async function ProjectFunnelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await assertProjectRoute(id);
  return <FunnelPage searchParams={Promise.resolve({ projectId: id })} />;
}
