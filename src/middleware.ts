import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { compress } from 'next-compression'

export async function middleware(request: NextRequest) {
  // Appliquer la compression uniquement pour /graphql
  if (request.nextUrl.pathname.startsWith('/graphql')) {
    return compress()(request, NextResponse.next())
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/graphql/:path*',
} 