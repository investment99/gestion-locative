-- PARTIE 3 : Sécurité Row Level Security (RLS)
-- Effacez le code précédent et collez celui-ci

-- Activer RLS sur toutes les tables
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_settings ENABLE ROW LEVEL SECURITY;

-- Créer une fonction pour obtenir l'agency_id de l'utilisateur connecté
CREATE OR REPLACE FUNCTION auth.agency_id() 
RETURNS UUID AS $$
  SELECT agency_id 
  FROM public.tenants 
  WHERE id = auth.uid()
  UNION
  SELECT id 
  FROM public.agencies 
  WHERE id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER;

-- Policies pour AGENCIES
CREATE POLICY "Agencies can view own data" ON agencies
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Agencies can update own data" ON agencies
  FOR UPDATE USING (id = auth.uid());

-- Policies pour PROPERTIES
CREATE POLICY "View own properties" ON properties
  FOR SELECT USING (agency_id = auth.agency_id());

CREATE POLICY "Manage own properties" ON properties
  FOR ALL USING (agency_id = auth.agency_id());

-- Policies pour TENANTS
CREATE POLICY "View own tenants" ON tenants
  FOR SELECT USING (agency_id = auth.agency_id() OR id = auth.uid());

CREATE POLICY "Manage own tenants" ON tenants
  FOR ALL USING (agency_id = auth.agency_id());

-- Policies pour CONVERSATIONS
CREATE POLICY "View own conversations" ON conversations
  FOR SELECT USING (
    agency_id = auth.agency_id() OR 
    tenant_id = auth.uid()
  );

CREATE POLICY "Manage own conversations" ON conversations
  FOR ALL USING (agency_id = auth.agency_id());

-- Policies pour MESSAGES
CREATE POLICY "View conversation messages" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
      AND (c.agency_id = auth.agency_id() OR c.tenant_id = auth.uid())
    )
  );

CREATE POLICY "Send messages" ON messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
      AND (c.agency_id = auth.agency_id() OR c.tenant_id = auth.uid())
    )
  );

-- Policies pour les autres tables
CREATE POLICY "Manage own documents" ON documents
  FOR ALL USING (agency_id = auth.agency_id());

CREATE POLICY "Manage own interventions" ON interventions
  FOR ALL USING (agency_id = auth.agency_id());

CREATE POLICY "Manage own payments" ON payments
  FOR ALL USING (agency_id = auth.agency_id());

CREATE POLICY "Manage own reminders" ON reminders
  FOR ALL USING (agency_id = auth.agency_id());

CREATE POLICY "Manage own settings" ON agency_settings
  FOR ALL USING (agency_id = auth.agency_id()); 