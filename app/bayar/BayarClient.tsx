"use client";

import { Suspense } from "react";
import BayarContent from "./BayarContent";

export default function BayarClient() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <BayarContent />
    </Suspense>
  );
}
