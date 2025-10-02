/** @type {import('next').NextConfig} */

// Trigger new Vercel deployment - 21/03/2024
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  
  // Optimiser pour les navigateurs modernes
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Configuration SWC pour navigateurs modernes - Optimisation performance
  experimental: {
    forceSwcTransforms: true,
    // Optimisation pour navigateurs modernes
    modernBrowsers: true,
    // Réduction des polyfills inutiles
    reducePolyfills: true,
    optimizeCss: true,
    optimizePackageImports: [
      '@heroicons/react',
      '@mui/icons-material',
      '@mui/material',
      'date-fns',
      'lodash'
    ],
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP'],
    turbo: {
      enabled: true,
      rules: {
        '*.svg': ['@svgr/webpack']
      }
    },
    optimizeServerReact: true,
    optimisticClientCache: true,
    serverActions: {
      bodySizeLimit: '2mb'
    },
  },
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
      skipDefaultConversion: true,
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['api.uclic.fr', 'media.uclic.fr', 'static.uclic.fr', 'ph-files.imgix.net', 'url2png.producthunt.com', 'secure.gravatar.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.uclic.fr',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'media.uclic.fr',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'static.uclic.fr',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ph-files.imgix.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/avatar/**',
      },
    ],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      },
      {
        // Images, fonts et médias statiques
        source: '/:path*.(jpg|jpeg|png|gif|ico|svg|webp|woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Expires',
            value: 'Thu, 31 Dec 2025 23:59:59 GMT'
          }
        ]
      },
      {
        // CSS et JS statiques Next.js
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        // CSS généraux
        source: '/:path*.css',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Expires',
            value: 'Thu, 31 Dec 2025 23:59:59 GMT'
          }
        ]
      },
      {
        // JS généraux
        source: '/:path*.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800'
          }
        ]
      },
      {
        // API routes - cache court
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300'
          }
        ]
      },
      {
        // HTML et autres ressources dynamiques
        source: '/:path*.html',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          }
        ]
      }
    ];
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  
  // Configuration des redirections
  async redirects() {
    return [
      {
        source: '/services/agence-marketing-e-commerce',
        destination: '/services/agence-marketing-e-commerce',
        permanent: true, // Utilise une redirection 301 (permanente)
      },
      {
        source: '/conditions-generales-de-vente',
        destination: '/legal/conditions-generales-de-vente',
        permanent: true, // Utilise une redirection 301 (permanente)
      },
      {
        source: '/services/agence-relation-presse',
        destination: '/expertise/freelance-seo',
        permanent: true, // Utilise une redirection 301 (permanente)
      },
      {
        source: '/growth-hacking/:slug',
        destination: '/blog/:slug',
        permanent: true, // Utilise une redirection 301 (permanente)
      },
      {
        source: '/startup/:slug',
        destination: '/blog/:slug',
        permanent: true, // Utilise une redirection 301 (permanente)
      },
      {
        source: '/product-led/:slug',
        destination: '/blog/:slug',
        permanent: true, // Utilise une redirection 301 (permanente)
      },
      {
        source: '/marketing/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/content-marketing/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/referencement-naturel/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/strategies-de-growth-marketing/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/social-media/:slug',
        destination: '/blog/category/social-media',
        permanent: true,
      },
      {
        source: '/services/agence-google-ads',
        destination: '/expertise/agence-paid-media/agence-google-ads',
        permanent: true,
      },
      {
        source: '/levee-de-fonds/page/1',
        destination: '/levee-de-fonds',
        permanent: true,
      },
      {
        source: '/services/referencement-naturel',
        destination: '/expertise/freelance-seo',
        permanent: true,
      },
      {
        source: '/services/bing-ads',
        destination: '/expertise/agence-paid-media/agence-bing-ads',
        permanent: true,
      },
      {
        source: '/machine-à-sous/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/mentions-legales',
        destination: '/legal/mentions-legales',
        permanent: true, // Redirection 301 SEO
      },
      // Redirections pour les 404 vers la home
      {
        source: '/levee-de-fonds/ceibo-leve-30m-series-b-funding',
        destination: '/',
        permanent: false, // Redirection 302 temporaire
      },
      {
        source: '/toolbox/attrack',
        destination: '/',
        permanent: false,
      },
      {
        source: '/toolbox/civet-2',
        destination: '/',
        permanent: false,
      },
      {
        source: '/toolbox/tapto',
        destination: '/',
        permanent: false,
      },
      {
        source: '/expertise/bi-reporting',
        destination: '/',
        permanent: false,
      },
    ];
  }
};

module.exports = nextConfig; 