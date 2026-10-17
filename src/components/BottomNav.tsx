"use client";

import React from "react";
import { Users, PlaySquare, ShoppingBag, BookOpen, GitFork, Wrench } from "lucide-react";

export type NavTab = "togoun" | "tognon" | "thronhi" | "nouyin" | "lignee" | "outils";

interface BottomNavProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  isMemberOfLignee?: boolean; // Pour les non-initiés (Agbilinon), l'onglet Lignée peut avoir une invite spéciale ou rester accessible en lecture publique
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  isMemberOfLignee = true,
}) => {
  // Ordre obligatoire spécifié dans les consignes :
  // Togoun, Tognon, Thronhi, Nouyin, Lignée et Outils
  // Si visiteur/non membre : 5 onglets (Lignée masquée). Si membre : 6 onglets.
  const allTabs = [
    {
      id: "togoun" as NavTab,
      label: "Togoun",
      subtitle: "Réseau",
      icon: Users,
    },
    {
      id: "tognon" as NavTab,
      label: "Tognon",
      subtitle: "Vidéos",
      icon: PlaySquare,
    },
    {
      id: "thronhi" as NavTab,
      label: "Thronhi",
      subtitle: "Boutique",
      icon: ShoppingBag,
    },
    {
      id: "nouyin" as NavTab,
      label: "Nouyin",
      subtitle: "Médias",
      icon: BookOpen,
    },
    {
      id: "lignee" as NavTab,
      label: "Lignée",
      subtitle: isMemberOfLignee ? "Arbre" : "Alliance",
      icon: GitFork,
    },
    {
      id: "outils" as NavTab,
      label: "Outils",
      subtitle: "Hub",
      icon: Wrench,
    },
  ];

  const tabs = allTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-thron-border shadow-lg md:max-w-xl md:left-1/2 md:-translate-x-1/2 md:rounded-t-2xl">
      <div className="flex items-center justify-around px-1 py-1.5 safe-area-bottom">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-1.5 min-w-[50px] min-h-[48px] rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-thron-blue font-bold scale-105"
                  : "text-slate-500 hover:text-thron-navy"
              }`}
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? "stroke-[2.5px] text-thron-blue" : "stroke-[1.8px]"
                  }`}
                />
              </div>
              <span
                className={`text-[9.5px] tracking-tight mt-0.5 leading-none ${
                  isActive ? "text-thron-blue font-extrabold" : "text-slate-500"
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-thron-gold rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
