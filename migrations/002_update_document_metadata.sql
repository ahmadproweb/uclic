ALTER TABLE document_metadata
ADD COLUMN document_type_id UUID REFERENCES document_types(id),
ADD COLUMN metadata JSONB,
ADD COLUMN validation_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN validation_message TEXT;

-- Index pour la recherche par type de document
CREATE INDEX idx_document_metadata_type ON document_metadata(document_type_id);

-- Contrainte pour s'assurer que le statut de validation est valide
ALTER TABLE document_metadata
ADD CONSTRAINT check_validation_status
CHECK (validation_status IN ('pending', 'validated', 'rejected'));

-- Fonction de validation des documents
CREATE OR REPLACE FUNCTION validate_document()
RETURNS TRIGGER AS $$
DECLARE
    doc_type_rules JSONB;
BEGIN
    -- Récupérer les règles de validation du type de document
    SELECT validation_rules INTO doc_type_rules
    FROM document_types
    WHERE id = NEW.document_type_id;

    -- Vérifier le format du fichier
    IF NOT (NEW.mime_type = ANY (doc_type_rules->>'allowed_formats')) THEN
        NEW.validation_status := 'rejected';
        NEW.validation_message := 'Format de fichier non autorisé';
        RETURN NEW;
    END IF;

    -- Vérifier la taille du fichier
    IF (NEW.file_bytes::BIGINT > (doc_type_rules->>'max_size_mb')::BIGINT * 1024 * 1024) THEN
        NEW.validation_status := 'rejected';
        NEW.validation_message := 'Taille du fichier trop importante';
        RETURN NEW;
    END IF;

    -- Si toutes les validations passent
    NEW.validation_status := 'validated';
    NEW.validation_message := 'Document validé';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour la validation automatique des documents
CREATE TRIGGER validate_document_on_insert
    BEFORE INSERT OR UPDATE ON document_metadata
    FOR EACH ROW
    EXECUTE FUNCTION validate_document(); 