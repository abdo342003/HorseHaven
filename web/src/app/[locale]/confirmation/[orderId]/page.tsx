import ConfirmationView from "@/components/ConfirmationView";

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  return <ConfirmationView orderId={orderId} />;
}