import { Loader2 } from "lucide-react";

export default function Loading({
  title = "Loading...",
  iconOnly = false,
}: {
  title?: string;
  iconOnly?: boolean;
}) {
  return (
    <p className="flex items-center justify-center text-center gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      {!iconOnly ? title : null}
    </p>
  );
}
