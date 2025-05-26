-- PARTIE 2 : Tables complémentaires
-- Effacez le code précédent et collez celui-ci

-- 6. Table des documents
CREATE TABLE documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    file_url TEXT,
    file_size INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Table des interventions
CREATE TABLE interventions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    type VARCHAR(100),
    description TEXT,
    urgency VARCHAR(20),
    status VARCHAR(50) DEFAULT 'pending',
    provider_name VARCHAR(255),
    scheduled_date DATE,
    created_by VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Table des paiements
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending',
    due_date DATE,
    paid_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Table des rappels
CREATE TABLE reminders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    type VARCHAR(50),
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    scheduled_date TIMESTAMP WITH TIME ZONE,
    sent_date TIMESTAMP WITH TIME ZONE,
    is_automatic BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Table des paramètres d'agence
CREATE TABLE agency_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE UNIQUE,
    global_mode VARCHAR(20) DEFAULT 'manual' CHECK (global_mode IN ('manual', 'auto')),
    auto_payment_reminders BOOLEAN DEFAULT TRUE,
    auto_document_reminders BOOLEAN DEFAULT TRUE,
    auto_lease_reminders BOOLEAN DEFAULT TRUE,
    auto_maintenance_reminders BOOLEAN DEFAULT TRUE,
    openai_api_key TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_properties_agency ON properties(agency_id);
CREATE INDEX idx_tenants_agency ON tenants(agency_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
CREATE INDEX idx_interventions_status ON interventions(status);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_conversations_agency ON conversations(agency_id);
CREATE INDEX idx_conversations_tenant ON conversations(tenant_id); 