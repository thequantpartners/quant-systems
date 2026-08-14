"use client";

import { useEffect } from "react";
import { track } from "../../../lib/tracking";

export default function SolutionTracker({ slug }: { slug: string }) {
  useEffect(() => {
    track("view_solution", { utm_content: slug });
  }, [slug]);
  return null;
}
