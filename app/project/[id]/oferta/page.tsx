import OfferPage from "@/app/offer/page";
import { assertProjectRoute } from "@/lib/project-route-guard";

export default async function ProjectOfferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await assertProjectRoute(id);
  return <OfferPage searchParams={Promise.resolve({ projectId: id })} />;
}
