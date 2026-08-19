import ConfirmationView from "@/components/ConfirmationView";

export default function ConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = params as unknown as { orderId: string };
  return <ConfirmationView orderId={orderId} />;
}