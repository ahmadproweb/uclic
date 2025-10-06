"use client";

import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { Suspense, useEffect, useState } from "react";

function PostHogPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && posthog.__loaded) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  const [isPostHogLoaded, setIsPostHogLoaded] = useState(false);

  useEffect(() => {
    const loadPostHog = () => {
      if (typeof window !== "undefined" && !isPostHogLoaded && !posthog.__loaded) {
        posthog.init("phc_tgVMqLsXV5UAc3fluEFVXs5qrX0IaFJpBPUSyMeUaIN", {
          api_host: "https://eu.i.posthog.com",
          person_profiles: "identified_only",
          capture_pageview: false,
          // Disable surveys and autocapture
          disable_surveys: true,
          autocapture: false,
          disable_session_recording: false, // Keep recordings if you need them
          loaded: (ph) => {
            setIsPostHogLoaded(true);
          },
        });
      }
    };

    const timer = setTimeout(loadPostHog, 5000);

    const handleInteraction = () => {
      clearTimeout(timer);
      loadPostHog();
    };

    const events = ['click', 'scroll', 'touchstart', 'mousemove'];
    events.forEach(event => {
      window.addEventListener(event, handleInteraction, { once: true, passive: true });
    });

    return () => {
      clearTimeout(timer);
      events.forEach(event => {
        window.removeEventListener(event, handleInteraction);
      });
    };
  }, [isPostHogLoaded]);

  return (
    <PostHogProvider client={posthog}>
      {isPostHogLoaded && (
        <Suspense fallback={null}>
          <PostHogPageViewTracker />
        </Suspense>
      )}
      {children}
    </PostHogProvider>
  );
}