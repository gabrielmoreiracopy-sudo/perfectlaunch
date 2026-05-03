import StrategyPage from "@/app/strategy/page";
import { assertProjectRoute } from "@/lib/project-route-guard";

export default async function ProjectStrategyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await assertProjectRoute(id);
  return <StrategyPage searchParams={Promise.resolve({ projectId: id })} />;
}
