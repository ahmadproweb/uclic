import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Énumération des statuts possibles
export enum DocumentStatus {
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  IN_REVIEW = 'in_review'
}

interface DocumentType {
  id: string;
  name: string;
  description: string;
  required_fields: {
    fields: string[];
  };
  validation_rules: {
    allowed_formats: string[];
    max_size_mb: number;
  };
}

interface DocumentUploadParams {
  file: File;
  userId: string;
  documentTypeId: string;
  metadata?: Record<string, any>;
}

export class DocumentService {
  // Récupérer les types de documents disponibles
  async getDocumentTypes(): Promise<DocumentType[]> {
    const { data, error } = await supabase
      .from('document_types')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  }

  // Récupérer un type de document spécifique
  async getDocumentType(id: string): Promise<DocumentType | null> {
    const { data, error } = await supabase
      .from('document_types')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Valider les métadonnées du document
  private async validateMetadata(documentType: DocumentType, metadata: Record<string, any>): Promise<string[]> {
    const errors: string[] = [];
    const requiredFields = documentType.required_fields.fields;

    for (const field of requiredFields) {
      if (!metadata[field]) {
        errors.push(`Le champ ${field} est requis`);
      }
    }

    return errors;
  }

  // Upload d'un document
  async uploadDocument({ file, userId, documentTypeId, metadata = {} }: DocumentUploadParams) {
    try {
      // Récupérer le type de document
      const documentType = await this.getDocumentType(documentTypeId);
      if (!documentType) {
        throw new Error('Type de document invalide');
      }

      // Valider les métadonnées
      const metadataErrors = await this.validateMetadata(documentType, metadata);
      if (metadataErrors.length > 0) {
        throw new Error(`Erreurs de validation: ${metadataErrors.join(', ')}`);
      }

      // Upload du fichier dans le storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/${documentTypeId}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Créer l'entrée dans document_metadata
      const { data: documentMetadata, error: metadataError } = await supabase
        .from('document_metadata')
        .insert([
          {
            user_document_id: userId,
            document_type_id: documentTypeId,
            original_filename: file.name,
            mime_type: file.type,
            file_bytes: file.size,
            metadata,
            file_path: filePath
          }
        ])
        .select()
        .single();

      if (metadataError) throw metadataError;

      // Créer l'entrée dans user_documents avec le statut correct
      const { error: userDocError } = await supabase
        .from('user_documents')
        .insert([
          {
            user_id: userId,
            document_id: documentMetadata.id,
            status: DocumentStatus.SUBMITTED // Utilisation du statut correct
          }
        ]);

      if (userDocError) {
        // Si l'insertion échoue, supprimer le fichier uploadé et l'entrée metadata
        await supabase.storage
          .from('documents')
          .remove([filePath]);
        
        await supabase
          .from('document_metadata')
          .delete()
          .eq('id', documentMetadata.id);

        throw userDocError;
      }

      return documentMetadata;
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      throw error;
    }
  }

  // Récupérer les documents d'un utilisateur
  async getUserDocuments(userId: string) {
    const { data, error } = await supabase
      .from('document_metadata')
      .select(`
        *,
        document_types (
          name,
          description
        ),
        user_documents!inner (
          status,
          user_id
        )
      `)
      .eq('user_document_id', userId)
      .order('upload_date', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Récupérer un document spécifique
  async getDocument(documentId: string) {
    const { data, error } = await supabase
      .from('document_metadata')
      .select(`
        *,
        document_types (
          name,
          description
        ),
        user_documents!inner (
          status,
          user_id
        )
      `)
      .eq('id', documentId)
      .single();

    if (error) throw error;
    return data;
  }

  // Vérifier si un document existe déjà
  async checkDocumentExists(userId: string, documentId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('user_documents')
      .select('id')
      .eq('user_id', userId)
      .eq('document_id', documentId)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  }
} 