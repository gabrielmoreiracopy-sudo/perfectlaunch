import AcquisitionPage from "@/app/acquisition/page";

export default async function ProjectAcquisitionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AcquisitionPage searchParams={Promise.resolve({ projectId: id })} />;
}
