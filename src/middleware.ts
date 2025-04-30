import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Redirection des URLs machine-à-sous vers la home
  if (request.nextUrl.pathname.includes('/machine-à-sous/') || request.nextUrl.pathname.includes('/machine-%C3%A0-sous/')) {
    return NextResponse.redirect(new URL('/', request.url), { status: 301 });
  }

  // Redirection de l'ancienne URL vers la nouvelle
  if (request.nextUrl.pathname === '/services/referencement-naturel') {
    return NextResponse.redirect(
      new URL('/expertise/freelance-seo', request.url),
      { status: 301 }
    )
  }

  // Redirection de /services/facebook-ads vers /expertise/agence-sma/agence-facebook-meta-ads
  if (request.nextUrl.pathname === '/services/facebook-ads') {
    return NextResponse.redirect(
      new URL('/expertise/agence-sma/agence-facebook-meta-ads', request.url),
      { status: 301 }
    )
  }

  // Redirection de /expertises/freelance-seo vers /expertise/freelance-seo
  if (request.nextUrl.pathname === '/expertises/freelance-seo') {
    return NextResponse.redirect(
      new URL('/expertise/freelance-seo', request.url),
      { status: 301 }
    )
  }

  // Redirection de /blog/page/1 vers /blog
  if (request.nextUrl.pathname === '/blog/page/1') {
    return NextResponse.redirect(new URL('/blog', request.url));
  }

  // La compression est gérée automatiquement par Next.js
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/services/referencement-naturel', 
    '/blog/page/1',
    '/machine-à-sous/:path*',
    '/machine-%C3%A0-sous/:path*',
    '/services/facebook-ads',
    '/expertises/freelance-seo'
  ],
} 