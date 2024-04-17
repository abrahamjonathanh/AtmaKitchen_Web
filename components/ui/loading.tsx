import { Loader2 } from "lucide-react";

export default function Loading({ title = "Loading..." }: { title?: string }) {
  return (
    <p className="flex items-center justify-center text-center">
      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      {title}
    </p>
  );
}
