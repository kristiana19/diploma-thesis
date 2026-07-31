"use client";

import Link from "next/link";
import { SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";

export default function DasboardBtn() {
  const { isCandidate, isLoading } = useUserRole();

  if (isCandidate || isLoading) return null;

  return (
    <Link href="/dashboard" className="shrink-0">
      <Button
        size="sm"
        aria-label="Open dashboard"
        className="
          h-9 shrink-0 gap-0 rounded-full
          bg-gradient-to-r from-pink-500 to-fuchsia-500
          px-2.5 text-white
          shadow-sm shadow-pink-500/25
          transition-all hover:opacity-90
          sm:gap-2 sm:px-4
        "
      >
        <SparklesIcon className="size-4 shrink-0" />

        <span className="hidden sm:inline">
          Dashboard
        </span>
      </Button>
    </Link>
  );
}