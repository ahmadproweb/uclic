import type { Metadata, Viewport } from "next";
import { inter, absans } from '@/lib/fonts';
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import Script from "next/script";
import { SpotifyPlayerProvider } from '@/components/providers/SpotifyPlayerProvider';
import { VideoPopupProvider } from '@/context/VideoPopupContext';
import VideoPopup from '@/components/ui/VideoPopup';
import HubspotChat from '@/components/ui/HubspotChat';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#E0FF5C'
};

export const metadata: Metadata = {
  title: "Uclic - Agence de Growth Marketing",
  description: "Uclic est une agence de growth marketing qui vous accompagne dans votre développement avec des stratégies data-driven et l'IA.",
  metadataBase: new URL('https://uclic.fr'),
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Uclic',
  },
  formatDetection: {
    telephone: false,
  },
  applicationName: 'Uclic'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${absans.variable} font-sans dark`} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark" />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              document.documentElement.classList.add('dark');
              localStorage.setItem('theme', 'dark');
            })();
          `
        }} />
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
        
        <Script id="performance-optimizations" strategy="afterInteractive">
          {`
            const deferredInit = () => {
              // Lazy loading avec IntersectionObserver
              if ('IntersectionObserver' in window) {
                const loadImage = (img) => {
                  const src = img.dataset.src;
                  if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                  }
                };

                const imageObserver = new IntersectionObserver(
                  (entries, observer) => {
                    entries.forEach(entry => {
                      if (entry.isIntersecting) {
                        loadImage(entry.target);
                        observer.unobserve(entry.target);
                      }
                    });
                  },
                  { rootMargin: '50px' }
                );

                document.querySelectorAll('img[loading="lazy"][data-src]')
                  .forEach(img => imageObserver.observe(img));
              }

              // Web Vitals optimisé
              if ('PerformanceObserver' in window) {
                try {
                  const vitalsObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach(entry => {
                      const value = entry.startTime || entry.value;
                      const id = entry.id || entry.entryType;
                      console.debug('[Web Vitals]', id, Math.round(value * 100) / 100);
                    });
                  });

                  vitalsObserver.observe({ 
                    entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']
                  });
                } catch (e) {
                  console.warn('Web Vitals:', e);
                }
              }
            };

            // Différer l'initialisation
            if (window.requestIdleCallback) {
              requestIdleCallback(deferredInit);
            } else {
              setTimeout(deferredInit, 1);
            }
          `}
        </Script>

        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js', { scope: '/' })
                  .then(registration => {
                    registration.addEventListener('updatefound', () => {
                      const newWorker = registration.installing;
                      newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'activated') {
                          console.debug('SW: Activated');
                        }
                      });
                    });
                  })
                  .catch(error => console.warn('SW:', error));
              });
            }
          `}
        </Script>

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <VideoPopupProvider>
            <SpotifyPlayerProvider>
              <div suppressHydrationWarning>
                <Header />
                {children}
                <Footer />
                <VideoPopup />
                <HubspotChat />
              </div>
            </SpotifyPlayerProvider>
          </VideoPopupProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}