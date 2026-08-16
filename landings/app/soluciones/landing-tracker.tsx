"use client";

import { useEffect } from "react";
import { captureAttribution } from "../../lib/attribution";
import { track } from "../../lib/tracking";

export default function LandingTracker() {
  useEffect(() => {
    track("view_landing", captureAttribution(window.location.search));
  }, []);

  return null;
}
