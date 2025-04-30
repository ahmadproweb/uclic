/** @type {import('next').NextConfig} */

// Trigger new Vercel deployment - 21/03/2024
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  devIndicators: {
    position: 'bottom-right',
  },
  experimental: {
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
    }
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['api.uclic.fr', 'ph-files.imgix.net', 'url2png.producthunt.com', 'secure.gravatar.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.uclic.fr',
        pathname: '/wp-content/uploads/**',
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
          }
        ]
      },
      {
        // JavaScript et CSS
        source: '/:path*.(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
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
    ];
  }
};

module.exports = nextConfig; 