import ContentPage from "@/app/content/page";

export default async function ProjectContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ContentPage searchParams={Promise.resolve({ projectId: id })} />;
}
