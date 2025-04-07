import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  // Faire suivre la requête à l'API WordPress
  const response = await fetch('https://api.uclic.fr/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  // Next.js gère automatiquement la compression
  return NextResponse.json(result, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
} 