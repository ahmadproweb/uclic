"use client";

import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { Suspense, useEffect, useState } from "react";

// PostHog sera initialisé de manière lazy

// Separate component that uses useSearchParams
function PostHogPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
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
    // Charger PostHog seulement après interaction ou délai
    const loadPostHog = () => {
      if (typeof window !== "undefined" && !isPostHogLoaded) {
        posthog.init("phc_tgVMqLsXV5UAc3fluEFVXs5qrX0IaFJpBPUSyMeUaIN", {
          api_host: "https://eu.i.posthog.com",
          person_profiles: "identified_only",
          capture_pageview: false,
        });
        setIsPostHogLoaded(true);
      }
    };

    // Délai de 5 secondes avant de charger PostHog
    const timer = setTimeout(loadPostHog, 5000);

    // Ou charger sur interaction utilisateur
    const handleInteraction = () => {
      clearTimeout(timer);
      loadPostHog();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, [isPostHogLoaded]);

  return (
    <PostHogProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageViewTracker />
      </Suspense>
      {children}
    </PostHogProvider>
  );
}
