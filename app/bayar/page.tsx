export const dynamic = "force-dynamic";

import BayarClient from "./BayarClient";

export default function Page({ params }: { params: { orderId: string } }) {
  return <BayarClient orderId={params.orderId} />;
}
