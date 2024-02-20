import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-2xl px-4 md:px-32", className)}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
