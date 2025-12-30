"use client";

import { useEffect } from "react";
import ReactGA from "react-ga4";
import { GA_MEASUREMENT_ID } from "@/app/lib/analytics";

export function GoogleAnalytics() {
  useEffect(() => {
    // Initialize GA4 only if measurement ID is set
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-41GFD4PVD8") {
      ReactGA.initialize(GA_MEASUREMENT_ID);
      ReactGA.send("pageview");
    }
  }, []);

  return null;
}
