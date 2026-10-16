"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  ShoppingBag,
  Star,
  ShieldCheck,
  Flame,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Users,
  Award,
  DollarSign,
  X,
  Package,
  Video,
  Headphones,
  FileText,
  GraduationCap,
  Download,
  Calendar,
  Lock,
  Plus,
  ShieldAlert,
  ArrowUpRight,
  Store,
} from "lucide-react";

export type ProductType =
  | "physique"
  | "service"
  | "telechargeable"
  | "document"
  | "video"
  | "audio"
  | "formation";

export interface ThronhiProduct {
  id: string;
  titre: string;
  type: ProductType;
  categorie: string;
  prixFCFA: number;
  imageUrl: string;
  description: string;
  vendeurNom: string;
  vendeurGrade: string;
  vendeurPhoto: string;
  lignee: string;
  estCertifie: boolean;
  // 3 Statistiques vendeur obligatoires (Section 8.5)
  nbProduitsVendus: number;
  nbClients: number;
  tauxAvisPositifs: number; // en %
  isBoosted?: boolean;
  stock?: number;
  delaiLivraison?: string;
  formatFichier?: string;
  dureeService?: string;
}

export const Marketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"catalogue" | "vendeur" | "sanctions">("catalogue");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("Tous");
  const [selectedProduct, setSelectedProduct] = useState<ThronhiProduct | null>(null);
  const [boostModalOpen, setBoostModalOpen] = useState(false);
  const [boostDays, setBoostDays] = useState(3);
  const [boostAudience, setBoostAudience] = useState(5000);

  // Espace Vendeur : Nouvel article
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<ProductType>("physique");
  const [newCategory, setNewCategory] = useState("Objets Rituels");
  const [newPrice, setNewPrice] = useState(15000);
  const [newDesc, setNewDesc] = useState("");

  const typesLabels: { id: ProductType | "Tous"; label: string; icon: any }[] = [
    { id: "Tous", label: "Tous les types", icon: ShoppingBag },
    { id: "physique", label: "Produits Physiques", icon: Package },
    { id: "service", label: "Services & Rituels", icon: Calendar },
    { id: "telechargeable", label: "Téléchargeables", icon: Download },
    { id: "document", label: "Documents & Grimoires", icon: FileText },
    { id: "video", label: "Vidéos sacrées", icon: Video },
    { id: "audio", label: "Audios & Chants", icon: Headphones },
    { id: "formation", label: "Formations Initiatiques", icon: GraduationCap },
  ];

  const [products, setPosts] = useState<ThronhiProduct[]>([
    {
      id: "prod-1",
      titre: "Colas Sacrées Blanches et Rouges Consacrées (Lot de 16)",
      type: "physique",
      categorie: "Objets Rituels",
      prixFCFA: 6000,
      imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80",
      description: "Colas sacrées sélectionnées et préparées pour les libations, les offrandes et les prières d'élévation spirituelle Alafia.",
      vendeurNom: "Hounnon Ayikodji MONSIA",
      vendeurGrade: "Hounnon",
      vendeurPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      estCertifie: true,
      nbProduitsVendus: 142,
      nbClients: 115,
      tauxAvisPositifs: 99,
      isBoosted: true,
      stock: 45,
      delaiLivraison: "24h - 48h (Cotonou / Calavi ou retrait au Hounto)",
    },
    {
      id: "prod-2",
      titre: "Consultation Spirituelle & Prière de Purification (Agora Live)",
      type: "service",
      categorie: "Services & Rituels",
      prixFCFA: 15000,
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
      description: "Séance privée d'intercession et lecture des oracles en ligne via la plateforme Agora Live ou au temple Alafia.",
      vendeurNom: "Togbé Mintoniu bo tozé",
      vendeurGrade: "Togbegan daho",
      vendeurPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      estCertifie: true,
      nbProduitsVendus: 89,
      nbClients: 76,
      tauxAvisPositifs: 100,
      isBoosted: true,
      dureeService: "45 minutes en direct",
    },
    {
      id: "prod-3",
      titre: "Pagne Blanc Cérémoniel Pur Coton Thron",
      type: "physique",
      categorie: "Habits Cultuels",
      prixFCFA: 18500,
      imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80",
      description: "Pagne sacré de haute qualité béni pour les rituels d'Atinkindoudou et les grandes assemblées cultuelles du dimanche.",
      vendeurNom: "Hounnon Mahugnon DOSSOU",
      vendeurGrade: "Hounnon",
      vendeurPhoto: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      estCertifie: true,
      nbProduitsVendus: 84,
      nbClients: 69,
      tauxAvisPositifs: 98,
      stock: 20,
      delaiLivraison: "Livraison locale sécurisée",
    },
    {
      id: "prod-4",
      titre: "Manuel Sacré des Rituels d'Atinkindoudou (PDF Téléchargeable)",
      type: "document",
      categorie: "Documents & Grimoires",
      prixFCFA: 5000,
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
      description: "Guide méthodologique complet des prières et invocations matinales sous le courant Thron kpeto deka alafia.",
      vendeurNom: "Hounnon Ayikodji MONSIA",
      vendeurGrade: "Hounnon",
      vendeurPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      estCertifie: true,
      nbProduitsVendus: 210,
      nbClients: 195,
      tauxAvisPositifs: 99,
      formatFichier: "PDF Sécurisé avec filigrane personnel",
    },
    {
      id: "prod-5",
      titre: "Cantiques et Éloges des Divinités Thron (Album MP3 Haute Définition)",
      type: "audio",
      categorie: "Audios & Chants",
      prixFCFA: 3000,
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
      description: "12 morceaux enregistrés lors des cérémonies Yesoufifo. Chants de transe et de sanctification communautaire.",
      vendeurNom: "Chœur Sacré Temple Alafia",
      vendeurGrade: "Groupe Initié",
      vendeurPhoto: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      estCertifie: true,
      nbProduitsVendus: 340,
      nbClients: 310,
      tauxAvisPositifs: 97,
      formatFichier: "MP3 320 kbps (Téléchargement direct)",
    },
    {
      id: "prod-6",
      titre: "Initiation aux Fondements et Principes d'Alafia (Module Vidéo)",
      type: "formation",
      categorie: "Formations Initiatiques",
      prixFCFA: 25000,
      imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
      description: "Parcours de formation en 6 modules vidéo préparant les Hounvis aux étapes d'élévation et au port des colliers sacrés.",
      vendeurNom: "Togbé Mintoniu bo tozé",
      vendeurGrade: "Togbegan daho",
      vendeurPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      estCertifie: true,
      nbProduitsVendus: 56,
      nbClients: 52,
      tauxAvisPositifs: 100,
      dureeService: "6 heures de cours en vidéo",
    },
  ]);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ThronhiProduct = {
      id: `prod-${Date.now()}`,
      titre: newTitle,
      type: newType,
      categorie: newCategory,
      prixFCFA: newPrice,
      imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80",
      description: newDesc,
      vendeurNom: "Hounnon Ayikodji MONSIA",
      vendeurGrade: "Hounnon",
      vendeurPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      estCertifie: true,
      nbProduitsVendus: 0,
      nbClients: 0,
      tauxAvisPositifs: 100,
    };
    setPosts([created, ...products]);
    setShowCreateModal(false);
    setNewTitle("");
    setNewDesc("");
  };

  const filteredProducts = products.filter(p => {
    const matchesQuery = p.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "Tous" || p.type === selectedType;
    return matchesQuery && matchesType;
  });

  // Calcul du coût de boost (100 F pour 1000 personnes / jour)
  const boostCost = (boostAudience / 1000) * 100 * boostDays;

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-3 space-y-4 font-sans">
      {/* 1. EN-TÊTE THRONHI & SOUS-NAVIGATION */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-thron-border shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700">
                Place de Marché Spirituelle
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-black text-thron-navy">
                Thronhi (Marketplace des Dignitaires)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("catalogue")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "catalogue" ? "bg-thron-navy text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Catalogue Sacré
            </button>
            <button
              onClick={() => setActiveTab("vendeur")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "vendeur" ? "bg-thron-navy text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Espace Vendeur
            </button>
            <button
              onClick={() => setActiveTab("sanctions")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "sanctions" ? "bg-rose-700 text-white shadow-sm" : "bg-rose-50 text-rose-700 hover:bg-rose-100"
              }`}
            >
              Règles 50% / 70%
            </button>
          </div>
        </div>

        {/* Barre de recherche et filtres de types */}
        {activeTab === "catalogue" && (
          <div className="space-y-3 pt-2">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher colas, pagnes, consultations, cantiques, grimoires..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-thron-blue/30 focus:border-thron-blue"
              />
            </div>

            {/* Défilement horizontal des 7 types de produits */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {typesLabels.map(t => {
                const Icon = t.icon;
                const isSelected = selectedType === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-thron-blue text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. ONGLET CATALOGUE THRONHI */}
      {activeTab === "catalogue" && (
        <div className="space-y-4">
          {/* Grille des produits avec boostés en tête */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {filteredProducts.map(p => (
              <div
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className={`bg-white rounded-3xl overflow-hidden border transition-all cursor-pointer group flex flex-col justify-between ${
                  p.isBoosted
                    ? "border-amber-400 shadow-md ring-1 ring-amber-300"
                    : "border-thron-border hover:shadow-md"
                }`}
              >
                {/* Image & Badges */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={p.imageUrl}
                    alt={p.titre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {p.isBoosted && (
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-thron-gold text-thron-navy text-[10px] font-black uppercase tracking-wider shadow flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Boosté
                    </span>
                  )}
                  <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold">
                    {p.type.toUpperCase()}
                  </span>
                </div>

                {/* Contenu */}
                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                      {p.categorie}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-thron-navy line-clamp-2 mt-0.5">
                      {p.titre}
                    </h4>
                  </div>

                  {/* 3 Statistiques Vendeur obligatoires */}
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-600 space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-thron-navy line-clamp-1">{p.vendeurNom}</span>
                      {p.estCertifie && (
                        <span className="text-emerald-700 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Certifié
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-slate-500 pt-0.5 border-t border-slate-200/60">
                      <span>{p.nbProduitsVendus} vendus</span>
                      <span>•</span>
                      <span>{p.nbClients} clients</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold">{p.tauxAvisPositifs}% avis +</span>
                    </div>
                  </div>

                  {/* Prix et action */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Prix initié</span>
                      <span className="text-sm font-extrabold text-thron-navy">
                        {p.prixFCFA.toLocaleString("fr-FR")} FCFA
                      </span>
                    </div>
                    <button className="p-2 rounded-xl bg-thron-blue hover:bg-thron-navy text-white text-xs font-bold transition-colors">
                      Commander
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. ONGLET ESPACE VENDEUR */}
      {activeTab === "vendeur" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-thron-navy">
                  Mon Espace Boutique Vendeur
                </h3>
                <p className="text-xs text-slate-600">
                  Réservé aux comptes de dignitaires (Togoundaho et Assiata, Hounnon minimum).
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-3.5 py-2 bg-thron-blue text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" /> Publier un Produit
              </button>
            </div>

            {/* Dashboard Vendeur avec 3 KPIs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                <span className="text-xl font-black text-amber-900 block">142</span>
                <span className="text-[11px] font-bold text-amber-800">Articles Vendus</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-center">
                <span className="text-xl font-black text-thron-navy block">115</span>
                <span className="text-[11px] font-bold text-thron-blue">Clients Uniques</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <span className="text-xl font-black text-emerald-800 block">99%</span>
                <span className="text-[11px] font-bold text-emerald-700">Avis Positifs</span>
              </div>
            </div>

            {/* Séquestre et commission 8% */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Solde des ventes sous séquestre :</span>
                <span className="font-black text-thron-navy text-sm">245 000 FCFA</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Les paiements des acheteurs sont retenus sur un compte de séquestre jusqu'à livraison confirmée. La commission plateforme de 8% est prélevée automatiquement au versement dans votre Wallet.
              </p>
            </div>

            {/* Simulateur de Boost d'Annonce */}
            <div className="p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/20 rounded-2xl border border-amber-300 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <h4 className="font-bold text-xs text-thron-navy">Booster vos produits en tête de liste</h4>
                </div>
                <span className="text-xs font-black text-amber-800">100 F / 1 000 p. / jour</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Portée ciblée</label>
                  <select
                    value={boostAudience}
                    onChange={(e) => setBoostAudience(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
                  >
                    <option value={1000}>1 000 personnes</option>
                    <option value={5000}>5 000 personnes</option>
                    <option value={10000}>10 000 personnes</option>
                    <option value={20000}>20 000 personnes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Durée (jours)</label>
                  <select
                    value={boostDays}
                    onChange={(e) => setBoostDays(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
                  >
                    <option value={1}>1 jour</option>
                    <option value={3}>3 jours</option>
                    <option value={7}>7 jours</option>
                    <option value={14}>14 jours</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-600">
                  Total débité du Wallet : <strong>{boostCost.toLocaleString("fr-FR")} FCFA</strong>
                </span>
                <button
                  onClick={() => alert(`Boost activé pour ${boostCost} FCFA !`)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-thron-navy font-bold rounded-xl text-xs shadow"
                >
                  Activer le Boost
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ONGLET RÈGLES SANCTIONS 50% ET 70% */}
      {activeTab === "sanctions" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-rose-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rose-700">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-serif font-bold text-base text-thron-navy">
                Règles d'Intégrité Commerciale & Sanctions
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pour préserver la pureté de la communauté Thron et la confiance des adeptes, des sanctions automatiques strictes sont appliquées aux vendeurs en fonction des avis acheteurs :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Règle 50% */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px]">
                  SEUIL 1 : 50% D'AVIS NÉGATIFS
                </span>
                <h4 className="font-bold text-amber-950">Suspension Immédiate du Compte Vendeur</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Dès que le compte atteint 50% d'avis négatifs, la boutique est automatiquement suspendue. La réactivation n'est possible qu'après enquête et validation par sa <strong>Lignée spirituelle</strong>.
                </p>
              </div>

              {/* Règle 70% */}
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-900 font-bold text-[10px]">
                  SEUIL 2 : 70% D'AVIS NÉGATIFS
                </span>
                <h4 className="font-bold text-rose-950">Bannissement Définitif & Autorité Nationale</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  À 70% d'avis négatifs, le compte vendeur est <strong>banni immédiatement</strong>. La réouverture ne peut être autorisée que par l'<strong>Autorité Nationale</strong> du culte Thron.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODALE DÉTAIL D'UN PRODUIT */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-thron-gold/40 animate-in fade-in zoom-in-95 my-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-amber-700 uppercase">{selectedProduct.type}</span>
              <button onClick={() => setSelectedProduct(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-48 rounded-2xl overflow-hidden">
              <img src={selectedProduct.imageUrl} alt="" className="w-full h-full object-cover" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg text-thron-navy">{selectedProduct.titre}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{selectedProduct.description}</p>
            </div>

            {/* Infos vendeur */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <img src={selectedProduct.vendeurPhoto} alt="" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <span className="font-bold text-thron-navy block">{selectedProduct.vendeurNom}</span>
                  <span className="text-[10px] text-slate-500">{selectedProduct.lignee}</span>
                </div>
              </div>
              <div className="text-right text-[11px]">
                <span className="font-bold text-emerald-700 block">{selectedProduct.tauxAvisPositifs}% avis positifs</span>
                <span className="text-slate-400">{selectedProduct.nbClients} clients</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 block">Prix à payer via Wallet</span>
                <span className="text-lg font-black text-thron-navy">
                  {selectedProduct.prixFCFA.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
              <button
                onClick={() => {
                  alert(`Commande enregistrée pour ${selectedProduct.titre} ! Fonds retenus en séquestre.`);
                  setSelectedProduct(null);
                }}
                className="py-2.5 px-6 rounded-xl bg-thron-navy hover:bg-thron-blue text-white font-bold text-xs shadow"
              >
                Payer avec mon Wallet (8% comm.)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE CRÉATION DE PRODUIT (ASSISTANT 7 TYPES) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-thron-gold/40 my-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-serif font-bold text-base text-thron-navy">Publier sur Thronhi</h4>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Type de produit (7 modèles)</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as ProductType)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                >
                  <option value="physique">Produit Physique (savon, cola, pagne)</option>
                  <option value="service">Service & Rituel (avec créneau Agora)</option>
                  <option value="telechargeable">Produit Téléchargeable</option>
                  <option value="document">Document & Grimoire sacré</option>
                  <option value="video">Vidéo sacrée</option>
                  <option value="audio">Audio MP3 & Chants</option>
                  <option value="formation">Formation Initiatique</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Titre du produit / service</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Savon noir de purification Alafia"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Prix en FCFA</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={3}
                  placeholder="Détails, vertus et conditions d'usage..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                Attestation obligatoire : Je certifie que ce produit est issu de la communauté Thron et respecte les règles cultuelles.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-thron-navy text-white rounded-xl font-bold text-xs shadow hover:bg-thron-blue"
              >
                Mettre en vente sur Thronhi
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
