export const dynamic = "force-dynamic";

import { Suspense } from "react";
import BayarClient from "./BayarClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <BayarClient />
    </Suspense>
  );
}
