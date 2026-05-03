import ContentPage from "@/app/content/page";
import { assertProjectRoute } from "@/lib/project-route-guard";

export default async function ProjectContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await assertProjectRoute(id);
  return <ContentPage searchParams={Promise.resolve({ projectId: id })} />;
}
