import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbWithSeparator({
  previousPage,
  currentPage,
}: {
  previousPage?: {
    title: string;
    link: string;
  }[];
  currentPage: string;
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">Beranda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
        {previousPage?.map((data, index) => (
          <BreadcrumbList key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link href={data.link}>{data.title}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        ))}

        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
