import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // La compression est gérée automatiquement par Next.js
  return NextResponse.next()
}

export const config = {
  matcher: '/graphql/:path*',
} 