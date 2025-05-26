-- PARTIE 3 : Sécurité Row Level Security (RLS) - Version simplifiée
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

-- Pour l'instant, on va créer des policies simples
-- Plus tard, on les améliorera avec l'authentification Supabase

-- Permettre temporairement l'accès complet (à modifier après l'auth)
CREATE POLICY "Temporary full access agencies" ON agencies
  FOR ALL USING (true);

CREATE POLICY "Temporary full access properties" ON properties
  FOR ALL USING (true);

CREATE POLICY "Temporary full access tenants" ON tenants
  FOR ALL USING (true);

CREATE POLICY "Temporary full access conversations" ON conversations
  FOR ALL USING (true);

CREATE POLICY "Temporary full access messages" ON messages
  FOR ALL USING (true);

CREATE POLICY "Temporary full access documents" ON documents
  FOR ALL USING (true);

CREATE POLICY "Temporary full access interventions" ON interventions
  FOR ALL USING (true);

CREATE POLICY "Temporary full access payments" ON payments
  FOR ALL USING (true);

CREATE POLICY "Temporary full access reminders" ON reminders
  FOR ALL USING (true);

CREATE POLICY "Temporary full access agency_settings" ON agency_settings
  FOR ALL USING (true); 