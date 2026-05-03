import StrategyPage from "@/app/strategy/page";

export default async function ProjectStrategyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StrategyPage searchParams={Promise.resolve({ projectId: id })} />;
}
