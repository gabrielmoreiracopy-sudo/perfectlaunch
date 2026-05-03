import RecoveryPage from "@/app/recovery/page";
import { assertProjectRoute } from "@/lib/project-route-guard";

export default async function ProjectRecoveryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await assertProjectRoute(id);
  return <RecoveryPage searchParams={Promise.resolve({ projectId: id })} />;
}
