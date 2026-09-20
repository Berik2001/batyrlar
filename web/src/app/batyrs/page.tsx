import { Suspense } from "react";
import type { Metadata } from "next";
import { BatyrsView } from "@/components/batyrs-view";

export const metadata: Metadata = { title: "Батырлар" };

export default function Page() {
  return (
    <Suspense>
      <BatyrsView />
    </Suspense>
  );
}
