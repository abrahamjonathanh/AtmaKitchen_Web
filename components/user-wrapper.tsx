import React from "react";
import { NavbarUser } from "./navbar";
import Footer from "./footer";
import MaxWidthWrapper from "./maxWidthWrapper";
import { cn } from "@/lib/utils";

export interface UserWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserWrapper({ children, className }: UserWrapperProps) {
  return (
    <div>
      <NavbarUser />
      <MaxWidthWrapper className={cn(" bg-white pt-6 pb-8", className)}>
        {children}
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
}
