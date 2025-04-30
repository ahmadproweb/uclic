'use client';

import { useState, useEffect } from 'react';
import { DocumentService } from '@/services/document';

interface DocumentType {
  id: string;
  name: string;
  description: string;
  required_fields: {
    fields: string[];
  };
}

export default function DocumentUpload() {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const documentService = new DocumentService();

  useEffect(() => {
    // Charger les types de documents disponibles
    const loadDocumentTypes = async () => {
      try {
        const types = await documentService.getDocumentTypes();
        setDocumentTypes(types);
      } catch (err) {
        setError('Erreur lors du chargement des types de documents');
      }
    };

    loadDocumentTypes();
  }, []);

  // Mettre à jour les champs de métadonnées en fonction du type sélectionné
  useEffect(() => {
    if (selectedType) {
      const selectedDocType = documentTypes.find(type => type.id === selectedType);
      if (selectedDocType) {
        const newMetadata: Record<string, string> = {};
        selectedDocType.required_fields.fields.forEach(field => {
          newMetadata[field] = '';
        });
        setMetadata(newMetadata);
      }
    }
  }, [selectedType, documentTypes]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleMetadataChange = (field: string, value: string) => {
    setMetadata(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (!file || !selectedType) {
        throw new Error('Veuillez sélectionner un fichier et un type de document');
      }

      await documentService.uploadDocument({
        file,
        userId: 'current-user-id', // À remplacer par l'ID de l'utilisateur actuel
        documentTypeId: selectedType,
        metadata
      });

      setSuccess(true);
      setFile(null);
      setSelectedType('');
      setMetadata({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Upload de document
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          Document uploadé avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sélection du type de document */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Type de document
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Sélectionnez un type</option>
            {documentTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name} - {type.description}
              </option>
            ))}
          </select>
        </div>

        {/* Upload de fichier */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Fichier
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full"
            required
          />
        </div>

        {/* Champs de métadonnées dynamiques */}
        {selectedType && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Informations complémentaires
            </h3>
            {Object.keys(metadata).map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {field}
                </label>
                <input
                  type="text"
                  value={metadata[field]}
                  onChange={(e) => handleMetadataChange(field, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Upload en cours...' : 'Uploader le document'}
        </button>
      </form>
    </div>
  );
} 