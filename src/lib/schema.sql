-- ==========================================================
-- THRON HOUNTO - Database Schema for Neon PostgreSQL
-- Version 1.0 - Lot 0 & 1 MVP
-- ==========================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Courants Spirituels (3 courants officiels non modifiables)
CREATE TABLE IF NOT EXISTS courants (
    id VARCHAR(50) PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertion des 3 courants confirmés
INSERT INTO courants (id, nom, description) VALUES
    ('alafia', 'Thron kpeto deka alafia', 'Premier courant de pensée au sein de la communauté Thron'),
    ('gokawodja', 'Thron kpeto deka gokawodja', 'Deuxième courant traditionnel majeur de la communauté Thron'),
    ('ve', 'Thron kpeto vé', 'Troisième courant spirituel de la communauté Thron')
ON CONFLICT (id) DO NOTHING;

-- 2. Grades (Hommes et Femmes - données configurables en base)
CREATE TABLE IF NOT EXISTS grades (
    id VARCHAR(50) PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    sexe VARCHAR(10) CHECK (sexe IN ('homme', 'femme')),
    rang INTEGER NOT NULL,
    est_tete_eligible BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO grades (id, nom, sexe, rang, est_tete_eligible, description) VALUES
    -- Hommes (ordre hiérarchique officiel)
    ('h_atinkindouvi', 'Atinkindouvi', 'homme', 1, FALSE, 'Premier grade initiatique'),
    ('h_kpindjigan', 'Kpindjigan', 'homme', 2, FALSE, 'Second grade initiatique'),
    ('h_hounnon_do_alidji', 'Hounnon do alidji', 'homme', 3, FALSE, 'Bientôt Hounnon, ayant déjà rempli les conditions'),
    ('h_hounnon', 'Hounnon', 'homme', 4, TRUE, 'Détenteur d un hounto, grade minimum pour être tête de branche'),
    ('h_hounnongan', 'Hounnongan', 'homme', 5, TRUE, 'Hounnon de grade supérieur'),
    ('h_hounnongangan', 'Hounnongangan', 'homme', 6, TRUE, 'Dignitaire spirituel'),
    ('h_hounnongan_daho', 'Hounnongan daho', 'homme', 7, TRUE, 'Grand dignitaire spirituel'),
    ('h_togbe', 'Togbe', 'homme', 8, TRUE, 'Titre honorifique et d autorité'),
    ('h_togbegan', 'Togbegan', 'homme', 9, TRUE, 'Grand dignitaire Togbe'),
    ('h_togbegagangan', 'Togbegagangan', 'homme', 10, TRUE, 'Haut dignitaire'),
    ('h_togbegan_daho', 'Togbegan daho', 'homme', 11, TRUE, 'Rang spirituel suprême'),
    -- Femmes
    ('f_atinkindouvi', 'Atinkindouvi', 'femme', 1, FALSE, 'Première affiliation féminine'),
    ('f_kpezinvi', 'Kpezinvi', 'femme', 2, FALSE, 'Second palier'),
    ('f_tassinon', 'Tassinon', 'femme', 3, FALSE, 'Dignitaire féminine'),
    ('f_hounonsi', 'Hounonsi', 'femme', 4, TRUE, 'Épouse pratiquante de Hounnon'),
    ('f_konfonon', 'Konfonon', 'femme', 5, TRUE, 'Épouse détentrice du fétiche Confo')
ON CONFLICT (id) DO NOTHING;

-- 3. Lignées et Temples
CREATE TABLE IF NOT EXISTS lignees (
    id VARCHAR(100) PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    courant_id VARCHAR(50) REFERENCES courants(id),
    fondateur_nom VARCHAR(250) NOT NULL,
    est_fondateur_decede BOOLEAN DEFAULT TRUE,
    chef_actuel_nom VARCHAR(250) NOT NULL,
    formule_abonnement VARCHAR(50) DEFAULT 'Togounkpevi',
    description TEXT,
    communaute_nombre INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Utilisateurs et Profils Spirituels
CREATE TABLE IF NOT EXISTS utilisateurs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    telephone VARCHAR(50) UNIQUE,
    email VARCHAR(150) UNIQUE,
    type_compte VARCHAR(50) CHECK (type_compte IN ('visiteur', 'membre_lignee', 'hounto')),
    lignee_id VARCHAR(100) REFERENCES lignees(id),
    affiliation VARCHAR(50) CHECK (affiliation IN ('Hounvi', 'Assi', 'Vidjidji', 'Fondateur', 'Tete')),
    grade_id VARCHAR(50) REFERENCES grades(id),
    sexe VARCHAR(10) CHECK (sexe IN ('homme', 'femme')),
    maitre_id UUID REFERENCES utilisateurs(id),
    pere_direct_id UUID REFERENCES utilisateurs(id),
    statut_validation VARCHAR(50) DEFAULT 'en_attente' CHECK (statut_validation IN ('valide', 'en_attente', 'rejete')),
    geolocalisation_latitude NUMERIC(10, 7),
    geolocalisation_longitude NUMERIC(10, 7),
    geolocalisation_adresse TEXT,
    wallet_solde_fcfa BIGINT DEFAULT 0,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index de performance et conformité
CREATE INDEX IF NOT EXISTS idx_utilisateurs_lignee ON utilisateurs(lignee_id);
CREATE INDEX IF NOT EXISTS idx_utilisateurs_grade ON utilisateurs(grade_id);
CREATE INDEX IF NOT EXISTS idx_utilisateurs_maitre ON utilisateurs(maitre_id);
