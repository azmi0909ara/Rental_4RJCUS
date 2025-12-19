import { Suspense } from "react";
import BayarClient from "../bayar/BayarClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-black text-white">
          Loading...
        </main>
      }
    >
      <BayarClient />
    </Suspense>
  );
}
