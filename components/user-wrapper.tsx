import React from "react";
import { NavbarUser } from "./navbar";
import Footer from "./footer";
import MaxWidthWrapper from "./maxWidthWrapper";
import { cn } from "@/lib/utils";
import { UserSidebar } from "./sidebar";

export interface UserWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function UserWrapper({ children, className }: UserWrapperProps) {
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

export function UserProductWrapper({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <main>
      <NavbarUser />

      <div className="flex gap-4">
        <UserSidebar />
        <MaxWidthWrapper
          className={cn(" bg-white pt-6 pb-8 md:pr-16 lg:pl-0", className)}
        >
          {children}
        </MaxWidthWrapper>
      </div>
      <Footer />
    </main>
  );
}
