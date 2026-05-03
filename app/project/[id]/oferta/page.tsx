import OfferPage from "@/app/offer/page";

export default async function ProjectOfferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OfferPage searchParams={Promise.resolve({ projectId: id })} />;
}
