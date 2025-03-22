import { getLegalPages } from '@/services/wordpress';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const legalPages = await getLegalPages();
    return NextResponse.json(legalPages);
  } catch (error) {
    console.error('Error in legal-pages API:', error);
    return NextResponse.json({ error: 'Failed to fetch legal pages' }, { status: 500 });
  }
} 