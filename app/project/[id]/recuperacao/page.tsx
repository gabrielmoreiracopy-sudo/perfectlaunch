import RecoveryPage from "@/app/recovery/page";

export default async function ProjectRecoveryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RecoveryPage searchParams={Promise.resolve({ projectId: id })} />;
}
