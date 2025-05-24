import { NextResponse } from "next/server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function POST(request: Request) {
  const data = await request.json();

  // Faire suivre la requête à l'API WordPress
  const response = await fetch("https://api.uclic.fr/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  // Next.js gère automatiquement la compression
  return NextResponse.json(result, {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
