import CommunicationPage from "@/app/communication/page";
import { assertProjectRoute } from "@/lib/project-route-guard";

export default async function ProjectCommunicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await assertProjectRoute(id);
  return <CommunicationPage searchParams={Promise.resolve({ projectId: id })} />;
}
