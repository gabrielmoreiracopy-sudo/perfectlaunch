import FunnelPage from "@/app/funnel/page";

export default async function ProjectFunnelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <FunnelPage searchParams={Promise.resolve({ projectId: id })} />;
}
