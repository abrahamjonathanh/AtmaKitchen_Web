import React, { ReactNode } from "react";

export default function InfoCard({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-2 rounded-lg border border-slate-200 p-4">
      {children}
    </div>
  );
}
