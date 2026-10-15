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
} from "lucide-react";

interface Product {
  id: string;
  titre: string;
  categorie: string;
  prixFCFA: number;
  imageUrl: string;
  description: string;
  vendeurNom: string;
  vendeurGrade: string;
  vendeurPhoto: string;
  lignee: string;
  estCertifie: boolean;
  // Les 3 compteurs obligatoires de vendeur (Section 8.5)
  nbProduitsVendus: number;
  nbClients: number;
  tauxAvisPositifs: number; // en %
  isBoosted?: boolean;
}

export const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [boostModalOpen, setBoostModalOpen] = useState(false);
  const [boostDays, setBoostDays] = useState(3);
  const [boostAudience, setBoostAudience] = useState(5000);

  const categories = [
    "Tous",
    "Habits Cultuels",
    "Objets Rituels",
    "Perles & Ornements",
    "Encens & Plantes",
    "Littérature & Cantiques",
  ];

  const products: Product[] = [
    {
      id: "prod-1",
      titre: "Pagne Blanc Cérémoniel Pur Coton Thron",
      categorie: "Habits Cultuels",
      prixFCFA: 18500,
      imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80",
      description: "Pagne sacré de haute qualité béni pour les rituels d'Atinkindoudou et les grandes assemblées cultuelles du dimanche. Tissé dans la pure tradition.",
      vendeurNom: "Hounnon Mahugnon DOSSOU",
      vendeurGrade: "Hounnon",
      vendeurPhoto: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      estCertifie: true,
      nbProduitsVendus: 84,
      nbClients: 69,
      tauxAvisPositifs: 98,
      isBoosted: true,
    },
    {
      id: "prod-2",
      titre: "Colas Blanches et Rouges Consacrées (Lot de 16)",
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
    },
    {
      id: "prod-3",
      titre: "Collier de Perles Traditionnelles de Temple",
      categorie: "Perles & Ornements",
      prixFCFA: 25000,
      imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80",
      description: "Parure de dignitaire ornée de perles sacrées aux couleurs du fétiche Thron. Destinée aux membres confirmés et dignitaires.",
      vendeurNom: "Tassinon Pelagie TOSSOU",
      vendeurGrade: "Tassinon (Dignitaire)",
      vendeurPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      estCertifie: true,
      nbProduitsVendus: 38,
      nbClients: 35,
      tauxAvisPositifs: 95,
    },
    {
      id: "prod-4",
      titre: "Encens Traditionnel de Purification Zogbé",
      categorie: "Encens & Plantes",
      prixFCFA: 4500,
      imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
      description: "Résines et plantes purificatrices récoltées selon les préceptes sacrés pour la paix et l'harmonie des demeures et des temples.",
      vendeurNom: "Hounnon Mahugnon DOSSOU",
      vendeurGrade: "Hounnon",
      vendeurPhoto: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      estCertifie: true,
      nbProduitsVendus: 210,
      nbClients: 180,
      tauxAvisPositifs: 97,
    },
  ];

  // Filtrage
  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === "Tous" || p.categorie === selectedCategory;
    const matchSearch =
      p.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.vendeurNom.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Calcul du boost officiel : 100 F pour 1 000 personnes / jour (Section 9.3)
  const boostCost = 100 * (boostAudience / 1000) * boostDays;

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* BANNIÈRE OFFICIELLE MARKETPLACE */}
      <div className="bg-gradient-to-r from-thron-navy via-thron-blue to-thron-navy rounded-3xl p-5 sm:p-6 text-white shadow-sacred border border-thron-gold/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-thron-gold/20 text-thron-gold text-[10px] font-bold uppercase tracking-wider mb-2 border border-thron-gold/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Boutique Exclusive Communauté Thron • Section 8.5</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold">
              Marketplace Spirituelle Certifiée
            </h2>
            <p className="text-xs text-blue-200 mt-1 max-w-lg">
              Vente exclusive de produits sacrés authentiques par des dignitaires de niveau minimum{" "}
              <strong className="text-thron-gold">Hounnon</strong> appartenant formellement à l'arbre.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setBoostModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-thron-gold text-thron-navy text-xs font-black rounded-xl shadow-gold hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <Flame className="w-4 h-4 fill-current text-thron-navy" />
              <span>Booster un Produit</span>
            </button>
          </div>
        </div>

        {/* RECHERCHE ET FILTRES */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher pagnes, colas, perles, calebasses sacrées..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 text-white placeholder-blue-200/60 rounded-xl text-xs border border-white/20 focus:outline-none focus:border-thron-gold"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-thron-gold text-thron-navy shadow"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RÈGLES DE MODÉRATION ET SUSPENSION (Section 8.5) */}
      <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 text-xs text-slate-700 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span className="text-[11px]">
            <strong>Règles de confiance :</strong> 50% d'avis négatifs = suspension du compte vendeur par sa lignée. 70% d'avis négatifs = bannissement immédiat.
          </span>
        </div>
        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px]">
          Commission 8%
        </span>
      </div>

      {/* CATALOGUE DES PRODUITS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-3xl border border-thron-border shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Image avec Badge Boost et Catégorie */}
              <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                <img
                  src={p.imageUrl}
                  alt={p.titre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-thron-navy/90 text-white text-[10px] font-bold backdrop-blur-sm">
                    {p.categorie}
                  </span>
                  {p.isBoosted && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-500 text-thron-navy text-[10px] font-black flex items-center gap-1 shadow">
                      <Flame className="w-3 h-3 fill-current" /> Boosté
                    </span>
                  )}
                </div>
              </div>

              {/* Contenu et Prix */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg font-black text-thron-navy">
                    {p.prixFCFA.toLocaleString("fr-FR")} F CFA
                  </span>
                </div>

                <h3 className="font-serif font-bold text-sm text-slate-800 line-clamp-1">
                  {p.titre}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>

                {/* LES 3 COMPTEURS DU VENDEUR CONFIRMÉS (Section 8.5) */}
                <div className="pt-3 border-t border-slate-100 mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-thron-gold flex-shrink-0">
                      <img src={p.vendeurPhoto} alt={p.vendeurNom} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-thron-navy block truncate">
                        {p.vendeurNom}
                      </span>
                      <span className="text-[10px] text-amber-600 font-semibold block">
                        {p.vendeurGrade} • {p.lignee}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1 bg-slate-50 p-2 rounded-xl text-center text-[10px]">
                    <div>
                      <span className="block font-bold text-thron-navy">{p.nbProduitsVendus}</span>
                      <span className="text-slate-400">Vendus</span>
                    </div>
                    <div>
                      <span className="block font-bold text-thron-navy">{p.nbClients}</span>
                      <span className="text-slate-400">Clients</span>
                    </div>
                    <div>
                      <span className="block font-bold text-emerald-600">{p.tauxAvisPositifs}%</span>
                      <span className="text-slate-400">Positifs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => setSelectedProduct(p)}
                className="w-full py-2.5 bg-thron-navy hover:bg-thron-blue text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Voir & Commander
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL SIMULATEUR DE BOOST (Section 9.3) */}
      {boostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-thron-gold/40 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-600 fill-current" />
                <h4 className="font-serif font-bold text-base text-thron-navy">
                  Booster la Visibilité d'un Produit
                </h4>
              </div>
              <button
                onClick={() => setBoostModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-slate-700">
                <span className="font-bold text-thron-navy">Formule officielle du cahier des charges :</span>
                <p className="mt-1 text-[11px]">
                  100 F pour 1 000 personnes et par jour. Votre produit apparaîtra en tête du fil marketplace et dans le réseau social Togoun.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Audience cible visée (nombre de fidèles)
                </label>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="1000"
                  value={boostAudience}
                  onChange={(e) => setBoostAudience(Number(e.target.value))}
                  className="w-full accent-thron-gold"
                />
                <div className="flex justify-between font-bold text-thron-navy mt-1">
                  <span>1 000 personnes</span>
                  <span className="text-amber-600">{boostAudience.toLocaleString("fr-FR")} personnes</span>
                  <span>20 000</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Durée de diffusion
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 3, 7, 14].map((d) => (
                    <button
                      key={d}
                      onClick={() => setBoostDays(d)}
                      className={`py-2 rounded-xl font-bold border transition-all ${
                        boostDays === d
                          ? "bg-thron-navy text-white border-thron-navy"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      {d} jour{d > 1 ? "s" : ""}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 uppercase font-medium">Coût Total du Boost :</span>
                <div className="font-serif text-2xl font-black text-thron-navy mt-0.5">
                  {boostCost.toLocaleString("fr-FR")} F CFA
                </div>
                <span className="text-[10px] text-slate-400">
                  Déduit directement de votre solde Wallet
                </span>
              </div>
            </div>

            <button
              onClick={() => setBoostModalOpen(false)}
              className="w-full py-3 bg-thron-navy hover:bg-thron-blue text-white rounded-xl text-xs font-bold transition-colors"
            >
              Confirmer et lancer le Boost
            </button>
          </div>
        </div>
      )}

      {/* MODAL FICHE DÉTAIL PRODUIT & COMMANDE */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-thron-gold/40 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="relative h-48 rounded-2xl overflow-hidden">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.titre}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <span className="font-serif text-2xl font-black text-thron-navy">
                {selectedProduct.prixFCFA.toLocaleString("fr-FR")} F CFA
              </span>
              <h4 className="font-serif font-bold text-base text-slate-800 mt-1">
                {selectedProduct.titre}
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center gap-2 mb-1 font-bold text-thron-navy">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Vendeur Hounnon vérifié
              </div>
              <p className="text-[11px] text-slate-500">
                Paiement sécurisé via Wallet ou Mobile Money Kkiapay. Commission plateforme de 8% prélevée à la validation.
              </p>
            </div>

            <button
              onClick={() => {
                alert("Commande initiée avec succès ! Les fonds sont sécurisés.");
                setSelectedProduct(null);
              }}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Valider la commande ({selectedProduct.prixFCFA.toLocaleString("fr-FR")} F)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
