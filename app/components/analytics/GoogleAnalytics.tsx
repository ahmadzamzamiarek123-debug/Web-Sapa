"use client";

import { useEffect } from "react";
import ReactGA from "react-ga4";
import { GA_MEASUREMENT_ID } from "@/app/lib/analytics";

export function GoogleAnalytics() {
  useEffect(() => {
    // Initialize GA4 if measurement ID is available
    if (GA_MEASUREMENT_ID) {
      console.log("🔍 GA4 Initializing with ID:", GA_MEASUREMENT_ID);

      try {
        ReactGA.initialize(GA_MEASUREMENT_ID);
        ReactGA.send("pageview");
        console.log("✅ GA4 Initialized successfully");
      } catch (error) {
        console.error("❌ GA4 Initialization failed:", error);
      }
    } else {
      console.warn("⚠️ GA4 Measurement ID not found");
    }
  }, []);

  return null;
}
