import { NextRequest, NextResponse } from 'next/server';
import { DocumentService } from '@/services/document';

const corsHeaders = {
  'Content-Type': 'application/json',
  'Accept-Profile': 'public',
  'Content-Profile': 'public',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const documentTypeId = formData.get('documentTypeId') as string;
    const metadata = JSON.parse(formData.get('metadata') as string);
    const userId = formData.get('userId') as string;

    if (!file || !documentTypeId || !userId) {
      return NextResponse.json(
        { error: 'Fichier, type de document et ID utilisateur requis' },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }

    const documentService = new DocumentService();

    // Vérifier si le document existe déjà
    const exists = await documentService.checkDocumentExists(userId, documentTypeId);
    if (exists) {
      return NextResponse.json(
        { error: 'Un document de ce type existe déjà pour cet utilisateur' },
        { 
          status: 409,
          headers: corsHeaders
        }
      );
    }

    const result = await documentService.uploadDocument({
      file,
      userId,
      documentTypeId,
      metadata
    });

    return NextResponse.json(result, {
      headers: corsHeaders
    });
  } catch (error: any) {
    console.error('Erreur lors de l\'upload:', error);
    
    // Gestion des erreurs spécifiques
    if (error.message?.includes('check constraint')) {
      return NextResponse.json(
        { error: 'Statut de document invalide' },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'upload du document' },
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Route pour récupérer les types de documents
export async function GET() {
  try {
    const documentService = new DocumentService();
    const types = await documentService.getDocumentTypes();
    return NextResponse.json(types, {
      headers: corsHeaders
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des types:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des types de documents' },
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
} 