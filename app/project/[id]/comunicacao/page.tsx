import CommunicationPage from "@/app/communication/page";

export default async function ProjectCommunicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CommunicationPage searchParams={Promise.resolve({ projectId: id })} />;
}
