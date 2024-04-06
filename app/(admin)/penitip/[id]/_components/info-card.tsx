import React, { ReactNode } from "react";

export default function InfoCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4 space-y-2">
      {children}
    </div>
  );
}
