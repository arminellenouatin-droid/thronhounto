// ==========================================================
// THRON HOUNTO - Data Model & Reference Seed (Lot 0 & 1 MVP)
// ==========================================================

export interface Courant {
  id: string;
  nom: string;
  description: string;
  ligneesCount: number;
}

export interface Grade {
  id: string;
  nom: string;
  sexe: 'homme' | 'femme';
  rang: number;
  estTeteEligible: boolean;
  description: string;
}

export interface Lignee {
  id: string;
  nom: string;
  courantId: string;
  fondateurNom: string;
  estFondateurDecede: boolean;
  chefActuelNom: string;
  chefActuelGrade: string;
  formuleAbonnement: 'Togounkpevi' | 'Togoundaho' | 'Assiata';
  communauteNombre: number;
  description: string;
}

export interface SpiritualNode {
  id: string;
  nom: string;
  prenom: string;
  nomComplet: string;
  titreSpirituel?: string;
  grade: string;
  sexe: 'homme' | 'femme';
  affiliation: 'Hounvi' | 'Assi' | 'Vidjidji' | 'Tete' | 'Fondateur';
  photoUrl: string;
  temple?: string;
  localisation?: string;
  pereDirectNom?: string;
  pereDirectPhoto?: string;
  grandPereNom?: string;
  grandPerePhoto?: string;
  // Compteurs sacrés
  assiCount: number;       // Épouses
  vidjidjiCount: number;   // Enfants biologiques
  hounviCount: number;     // Enfants spirituels (baptisés)
  // Enfants et disciples
  children?: SpiritualNode[];
}

export interface SubscriptionPlan {
  id: 'Togounkpevi' | 'Togoundaho' | 'Assiata';
  nom: string;
  signification: string;
  prixMoisFCFA: number;
  prixAnFCFA: number;
  membresMax: string;
  gradeRequis: string;
  features: string[];
  isPopular?: boolean;
}

// 1. Les 3 Courants Confirmés
export const COURANTS_OFFICIELS: Courant[] = [
  {
    id: 'alafia',
    nom: 'Thron kpeto deka alafia',
    description: 'Premier courant spirituel historique, axé sur la paix sacrée (Alafia), l élévation et la droiture.',
    ligneesCount: 42,
  },
  {
    id: 'gokawodja',
    nom: 'Thron kpeto deka gokawodja',
    description: 'Grand courant spirituel de la fraternité et de l union traditionnelle des assemblées.',
    ligneesCount: 31,
  },
  {
    id: 've',
    nom: 'Thron kpeto vé',
    description: 'Courant spirituel vénérable dédié aux racines profondes et à la transmission sacrée.',
    ligneesCount: 19,
  },
];

// 2. Grades des Hommes et des Femmes
export const GRADES_HOMMES: Grade[] = [
  { id: 'h_atinkindouvi', nom: 'Atinkindouvi', sexe: 'homme', rang: 1, estTeteEligible: false, description: 'Premier grade initiatique' },
  { id: 'h_kpindjigan', nom: 'Kpindjigan', sexe: 'homme', rang: 2, estTeteEligible: false, description: 'Second grade initiatique' },
  { id: 'h_hounnon_do_alidji', nom: 'Hounnon do alidji', sexe: 'homme', rang: 3, estTeteEligible: false, description: 'Bientôt Hounnon, ayant déjà rempli les conditions' },
  { id: 'h_hounnon', nom: 'Hounnon', sexe: 'homme', rang: 4, estTeteEligible: true, description: 'Premier grade de tête possible, détenteur d un hounto' },
  { id: 'h_hounnongan', nom: 'Hounnongan', sexe: 'homme', rang: 5, estTeteEligible: true, description: 'Hounnon supérieur' },
  { id: 'h_hounnongangan', nom: 'Hounnongangan', sexe: 'homme', rang: 6, estTeteEligible: true, description: 'Dignitaire spirituel établi' },
  { id: 'h_hounnongan_daho', nom: 'Hounnongan daho', sexe: 'homme', rang: 7, estTeteEligible: true, description: 'Grand dignitaire spirituel' },
  { id: 'h_togbe', nom: 'Togbe', sexe: 'homme', rang: 8, estTeteEligible: true, description: 'Titre royal et d autorité spirituelle' },
  { id: 'h_togbegan', nom: 'Togbegan', sexe: 'homme', rang: 9, estTeteEligible: true, description: 'Grand dignitaire Togbe' },
  { id: 'h_togbegagangan', nom: 'Togbegagangan', sexe: 'homme', rang: 10, estTeteEligible: true, description: 'Haut dignitaire' },
  { id: 'h_togbegan_daho', nom: 'Togbegan daho', sexe: 'homme', rang: 11, estTeteEligible: true, description: 'Rang suprême spirituel' },
];

export const GRADES_FEMMES: Grade[] = [
  { id: 'f_atinkindouvi', nom: 'Atinkindouvi', sexe: 'femme', rang: 1, estTeteEligible: false, description: 'Première affiliation féminine' },
  { id: 'f_kpezinvi', nom: 'Kpezinvi', sexe: 'femme', rang: 2, estTeteEligible: false, description: 'Second palier féminin' },
  { id: 'f_tassinon', nom: 'Tassinon', sexe: 'femme', rang: 3, estTeteEligible: false, description: 'Dignitaire féminine spirituelle' },
  { id: 'f_hounonsi', nom: 'Hounonsi', sexe: 'femme', rang: 4, estTeteEligible: true, description: 'Épouse pratiquante de Hounnon' },
  { id: 'f_konfonon', nom: 'Konfonon', sexe: 'femme', rang: 5, estTeteEligible: true, description: 'Détentrice du fétiche sacré Confo' },
];

// 3. Lignée de Référence Test : Mantinkpon ò
export const LIGNEE_MANTINKPON_O: Lignee = {
  id: 'mantinkpon-o',
  nom: 'Mantinkpon ò',
  courantId: 'alafia',
  fondateurNom: 'Feu Mantinkpon ò Adjikanmahoutokounon MONSIA',
  estFondateurDecede: true,
  chefActuelNom: 'Togbé Mintoniu bo tozé (MONISA Serge)',
  chefActuelGrade: 'Togbegan daho',
  formuleAbonnement: 'Assiata',
  communauteNombre: 1450,
  description: 'Lignée de haut rang spirituel rattachée au courant Thron kpéto déka alafia. Fondée par le grand ancêtre feu Mantinkpon ò.',
};

// 4. Arbre Généalogique de la Lignée Mantinkpon ò (Section 6.2)
export const ARBRE_MANTINKPON: SpiritualNode = {
  id: 'node-current-user',
  nom: 'MONSIA',
  prenom: 'Ayikodji',
  nomComplet: 'Hounnon Ayikodji MONSIA',
  titreSpirituel: 'Hounnon de l Assemblée d Abomey-Calavi',
  grade: 'Hounnon',
  sexe: 'homme',
  affiliation: 'Tete',
  photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  temple: 'Temple Alafia Ouidah / Calavi',
  localisation: 'Abomey-Calavi, Bénin (6.4485° N, 2.3557° E)',
  // Pères et Ancêtres
  pereDirectNom: 'Togbé Mintoniu bo tozé (MONISA Serge)',
  pereDirectPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  grandPereNom: 'Feu Mantinkpon ò Adjikanmahoutokounon MONSIA',
  grandPerePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
  // Compteurs sacrés obligatoires
  assiCount: 3,       // 3 épouses
  vidjidjiCount: 6,   // 6 enfants biologiques
  hounviCount: 48,    // 48 enfants spirituels baptisés
  // Descendants / Enfants spirituels immédiats
  children: [
    {
      id: 'node-h1',
      nom: 'DOSSOU',
      prenom: 'Mahugnon',
      nomComplet: 'Hounnon Mahugnon DOSSOU',
      grade: 'Hounnon',
      sexe: 'homme',
      affiliation: 'Hounvi',
      photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
      temple: 'Temple Zogbé Cotonou',
      localisation: 'Cotonou, Bénin',
      assiCount: 2,
      vidjidjiCount: 3,
      hounviCount: 14,
    },
    {
      id: 'node-h2',
      nom: 'AGBOSSOU',
      prenom: 'Koffi',
      nomComplet: 'Hounnon do alidji Koffi AGBOSSOU',
      grade: 'Hounnon do alidji',
      sexe: 'homme',
      affiliation: 'Hounvi',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      temple: 'Temple en consécration',
      localisation: 'Porto-Novo, Bénin',
      assiCount: 1,
      vidjidjiCount: 2,
      hounviCount: 0,
    },
    {
      id: 'node-h3',
      nom: 'HOUNSOU',
      prenom: 'Fiacre',
      nomComplet: 'Kpindjigan Fiacre HOUNSOU',
      grade: 'Kpindjigan',
      sexe: 'homme',
      affiliation: 'Hounvi',
      photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
      temple: 'Temple Alafia Calavi',
      localisation: 'Godomey, Bénin',
      assiCount: 1,
      vidjidjiCount: 1,
      hounviCount: 0,
    },
    {
      id: 'node-h4',
      nom: 'TOSSOU',
      prenom: 'Pelagie',
      nomComplet: 'Tassinon Pelagie TOSSOU',
      grade: 'Tassinon',
      sexe: 'femme',
      affiliation: 'Hounvi',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      temple: 'Hounto des Femmes Dignitaires',
      localisation: 'Ouidah, Bénin',
      assiCount: 0,
      vidjidjiCount: 4,
      hounviCount: 12,
    },
  ],
};

// Nœud du Père Direct (pour monter dans l'arbre)
export const NOEUD_PERE_DIRECT: SpiritualNode = {
  id: 'node-father',
  nom: 'MONISA',
  prenom: 'Serge',
  nomComplet: 'Togbé Mintoniu bo tozé (MONISA Serge)',
  titreSpirituel: 'Chef Suprême de la Lignée Mantinkpon ò',
  grade: 'Togbegan daho',
  sexe: 'homme',
  affiliation: 'Tete',
  photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  temple: 'Siège Suprême Mantinkpon ò',
  localisation: 'Ouidah / Cotonou, Bénin',
  pereDirectNom: 'Feu Mantinkpon ò Adjikanmahoutokounon MONSIA',
  grandPereNom: 'Racines Ancestrales Thron Kpeto Deka Alafia',
  assiCount: 7,
  vidjidjiCount: 18,
  hounviCount: 350,
};

// Nœud du Fondateur Ancestral (décédé, sans compte de connexion)
export const NOEUD_FONDATEUR: SpiritualNode = {
  id: 'node-founder',
  nom: 'MONSIA',
  prenom: 'Adjikanmahoutokounon',
  nomComplet: 'Feu Mantinkpon ò Adjikanmahoutokounon MONSIA',
  titreSpirituel: 'Fondateur Vénérable de la Lignée Mantinkpon ò',
  grade: 'Togbegan daho Suprême Ancestral',
  sexe: 'homme',
  affiliation: 'Fondateur',
  photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
  temple: 'Trône Fondateur Ancestral',
  localisation: 'Ouidah, Bénin',
  assiCount: 12,
  vidjidjiCount: 45,
  hounviCount: 1200,
};

// 5. Les Formules d'Abonnement Officielles (Section 9.1)
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'Togounkpevi',
    nom: 'Togounkpevi',
    signification: 'Petite communauté sacrée',
    prixMoisFCFA: 5000,
    prixAnFCFA: 50000,
    membresMax: 'Jusqu à 400 membres',
    gradeRequis: 'Hounnon au moins',
    features: [
      'Arbre généalogique spirituel tactile',
      'Géolocalisation du temple et domicile',
      'Groupe sur le réseau social Togoun',
      'Messagerie Atinsa (individuelle et groupe)',
      'Système de notifications push et in-app',
      'Gestion et suivi des cotisations (8% comm.)',
    ],
  },
  {
    id: 'Togoundaho',
    nom: 'Togoundaho',
    signification: 'Grande communauté sacrée',
    prixMoisFCFA: 10000,
    prixAnFCFA: 80000,
    membresMax: 'Jusqu à 1 200 membres',
    gradeRequis: 'Hounnongan au moins',
    isPopular: true,
    features: [
      'Toutes les fonctionnalités Togounkpevi',
      'Lancement et gestion des Tontines communautaires',
      'Page officielle de Lignée et Temple sur Togoun',
      'Compte vendeur vérifié sur la Marketplace sacrée',
      'Fonctionnalité sacrée Zindo',
      'Lives vidéo et audio Agora pour la lignée',
    ],
  },
  {
    id: 'Assiata',
    nom: 'Assiata',
    signification: 'Niveau suprême (Chef souverain)',
    prixMoisFCFA: 20000,
    prixAnFCFA: 150000,
    membresMax: 'Illimité (plus de 1 200 membres)',
    gradeRequis: 'Hounnongan ayant au moins un enfant Hounnongan',
    features: [
      'Toutes les fonctionnalités Togoundaho',
      'Accès exclusif à la Bibliothèque sacrée et enseignements',
      'Option API de paiement privée (Kkiapay / MTN Mobile Money)',
      'Support prioritaire et certification officielle',
      'Tableaux de bord d audience Analytics avancés',
      'Multi-temples rattachés sous la bannière suprême',
    ],
  },
];
