-- Ajouter la colonne password à la table agencies
ALTER TABLE agencies 
ADD COLUMN IF NOT EXISTS password VARCHAR(255);

-- Mettre à jour les agences existantes avec un mot de passe par défaut
UPDATE agencies 
SET password = 'admin123' 
WHERE password IS NULL; 