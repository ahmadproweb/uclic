import { NextResponse } from 'next/server';
import { compress } from 'next-compression';

export async function POST(request: Request) {
  const data = await request.json();
  
  // Faire suivre la requête à l'API WordPress
  const response = await fetch('https://uclic.fr/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  // Créer une réponse avec compression
  const compressedResponse = new NextResponse(JSON.stringify(result), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Content-Encoding': 'gzip',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });

  // Appliquer la compression
  return compress()(request, compressedResponse);
} 