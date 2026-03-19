import React from "react";
import Link from "next/link";

export interface BreadcrumbPath {
  name: string;
  href?: string;
}

export interface BreadcrumbProps {
  paths: BreadcrumbPath[];
}

export default function Breadcrumb({ paths }: BreadcrumbProps) {
  return (
    <nav className="flex flex-wrap items-center gap-y-2 gap-x-3 text-sm text-white/50 mb-10 font-medium tracking-wide bg-white/5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl sm:rounded-full border border-white/10 backdrop-blur-md w-fit max-w-full">
      <Link href="/" className="hover:text-white transition-colors shrink-0">
        Home
      </Link>
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          <span className="text-white/30 text-xs shrink-0">/</span>
          {path.href ? (
            <Link href={path.href} className="hover:text-white transition-colors shrink-0">
              {path.name}
            </Link>
          ) : (
            <span className="text-white inline-block line-clamp-1 sm:line-clamp-none">{path.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
