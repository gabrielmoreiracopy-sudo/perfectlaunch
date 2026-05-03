import FilesPage from "@/app/files/page";

export default async function ProjectFilesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <FilesPage searchParams={Promise.resolve({ projectId: id })} />;
}
