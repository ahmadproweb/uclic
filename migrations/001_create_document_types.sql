CREATE TABLE document_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    required_fields JSONB,
    validation_rules JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour la recherche par nom
CREATE INDEX idx_document_types_name ON document_types(name);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_document_types_updated_at
    BEFORE UPDATE ON document_types
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insertion des types de documents par défaut
INSERT INTO document_types (name, description, required_fields, validation_rules) VALUES
('KYC', 'Know Your Customer Documentation', 
    '{"fields": ["identity_proof", "address_proof", "photo"]}',
    '{"allowed_formats": ["pdf", "jpg", "png"], "max_size_mb": 10}'
),
('FINANCIAL_REPORT', 'Financial Reports and Statements',
    '{"fields": ["balance_sheet", "income_statement", "cash_flow"]}',
    '{"allowed_formats": ["pdf", "xlsx"], "max_size_mb": 20}'
),
('LEGAL_DOCUMENT', 'Legal Documents and Contracts',
    '{"fields": ["document_type", "signature_date", "expiry_date"]}',
    '{"allowed_formats": ["pdf"], "max_size_mb": 15}'
); 