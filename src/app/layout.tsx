import Footer from "@/components/footer/Footer";
import Analytics from "@/components/GoogleAnalytics";
import Header from "@/components/header/Header";
import { PHProvider } from "@/components/providers/PostHogProvider";
import { SpotifyPlayerProvider } from "@/components/providers/SpotifyPlayerProvider";
import HubspotChat from "@/components/ui/HubspotChat";
import VideoPopup from "@/components/ui/VideoPopup";
import { ThemeProvider } from "@/context/ThemeContext";
import { VideoPopupProvider } from "@/context/VideoPopupContext";
import { absans, gmono, inter } from "@/lib/fonts";
import type { Metadata } from "next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "@/styles/wordpress-content.css";

export const metadata: Metadata = {
  title: {
    default: `Uclic: Agence Growth Marketing / Hacking : Sales, Ops, Produit`,
    template: `%s | Uclic`,
  },
  alternates: {
    canonical: "./",
  },
  description:
    "Uclic conçoit et optimise vos opérations commerciales pour maximiser chaque interaction. Avec des workflows CRM avancés et des processus de vente automatisés.",
  metadataBase: new URL("https://www.uclic.fr"),
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Uclic",
  },
  formatDetection: {
    telephone: false,
  },
  applicationName: "Uclic",
  openGraph: {
    title: "Agence Growth Marketing / Hacking : Sales, Ops, Produit",
    description:
      "Uclic conçoit et optimise vos opérations commerciales pour maximiser chaque interaction. Avec des workflows CRM avancés et des processus de vente automatisés.",
    url: "https://www.uclic.fr",
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
    images: [
      {
        url: "https://static.uclic.fr/open.png",
        width: 1200,
        height: 630,
        alt: "Uclic - Agence Growth Marketing & IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence Growth Marketing / Hacking : Sales, Ops, Produit",
    description:
      "Uclic conçoit et optimise vos opérations commerciales pour maximiser chaque interaction. Avec des workflows CRM avancés et des processus de vente automatisés.",
    site: "@uclic_fr",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${absans.variable} ${gmono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Critical inline CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
    html{
      font-family:"Absans","Inter",system-ui,-apple-system,sans-serif!important;
      overflow-x:clip;
      scrollbar-gutter:stable;
    }
    body{
      margin:0;
      padding:0;
      overflow-x:clip;
      min-height:100vh;
    }
    .dark{--background:#000;--foreground:#F5F5F1}
    :root{--background:#fff;--foreground:#000}
    body{background:var(--background);color:var(--foreground)}
  `,
          }}
        />

        {/* DNS Prefetch - Only critical domains */}
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://api.uclic.fr" />

        {/* Preconnect - Only most critical */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Font Preload - Single optimized font */}
        <link
          rel="preload"
          href="/fonts/absans-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />

        {/* Logo preload */}
        <link rel="preload" href="/logo.svg" as="image" fetchPriority="high" />

        {/* Theme script - prevents FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              const savedTheme = localStorage.getItem('theme');
              const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
              
              document.documentElement.className = theme;
              document.documentElement.style.setProperty('--background', theme === 'dark' ? '#000000' : '#ffffff', 'important');
              document.documentElement.style.setProperty('--foreground', theme === 'dark' ? '#F5F5F1' : '#000000', 'important');
              document.documentElement.style.fontFamily = '"Absans", "Inter", system-ui, -apple-system, sans-serif';
              window.__INITIAL_THEME__ = theme;
            })();
          `,
          }}
        />

        {/* Favicons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />

        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
      </head>

      <body suppressHydrationWarning={true}>
        {/* Structured Data */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://www.uclic.fr/",
            name: "Uclic",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.uclic.fr/recherche?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>

        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            url: "https://www.uclic.fr/",
            name: "Uclic",
            logo: "/favicon/android-chrome-192x192.png",
            sameAs: [
              "https://www.linkedin.com/company/uclic-growth-marketing/",
              "https://twitter.com/uclic_fr",
            ],
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "contact@uclic.fr",
                telephone: "+33617125428",
                areaServed: "FR",
                availableLanguage: ["fr", "en"],
              },
            ],
          })}
        </Script>

        <Script
          id="local-business-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Uclic",
            url: "https://www.uclic.fr/",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Paris",
              addressCountry: "FR",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "48.8566",
              longitude: "2.3522",
            },
            telephone: "+33617125428",
            email: "contact@uclic.fr",
          })}
        </Script>

        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P6CSQ32"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <ThemeProvider>
          <VideoPopupProvider>
            <SpotifyPlayerProvider>
              <PHProvider>
                <div>
                  <Header />
                  {children}
                  <Footer />
                  <VideoPopup />
                  <HubspotChat />
                  <Analytics />
                </div>
              </PHProvider>
            </SpotifyPlayerProvider>
          </VideoPopupProvider>
        </ThemeProvider>

        <Script
          id="performance-optimizations"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        let loaded = false;
        
        const loadScripts = () => {
          if (loaded) return;
          loaded = true;
          
          // Use requestIdleCallback to avoid blocking main thread
          const defer = (fn) => {
            if ('requestIdleCallback' in window) {
              requestIdleCallback(fn, { timeout: 2000 });
            } else {
              setTimeout(fn, 1);
            }
          };
          
          defer(() => {
            const ga = document.createElement('script');
            ga.src = 'https://www.googletagmanager.com/gtag/js?id=GTM-P6CSQ32';
            ga.async = true;
            document.head.appendChild(ga);
          });
          
          // Batch image preloads using DocumentFragment
          defer(() => {
            const fragment = document.createDocumentFragment();
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = '/backgroundeffect.png';
            link.as = 'image';
            fragment.appendChild(link);
            document.head.appendChild(fragment);
          });
        };
        
        ['mousedown', 'touchstart', 'scroll'].forEach(e => {
          window.addEventListener(e, loadScripts, { passive: true, once: true });
        });
      })();
    `,
          }}
        />
<Script id="register-sw" strategy="afterInteractive">
  {`
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
          .then(function(registration) {
            console.log('SW registered:', registration.scope);
          })
          .catch(function(error) {
            console.log('SW registration failed:', error);
          });
      });
    }
  `}
</Script>
        <SpeedInsights />
      </body>
    </html>
  );
}
