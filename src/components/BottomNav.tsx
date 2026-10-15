"use client";

import React from "react";
import { GitFork, Users, PlaySquare, MessageCircle, Wrench } from "lucide-react";

export type NavTab = "lignee" | "togoun" | "tognon" | "atinsa" | "outils";

interface BottomNavProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  isMemberOfLignee?: boolean; // Si faux (visiteur), l'onglet Lignée est masqué
  atinsaUnread?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  isMemberOfLignee = true,
  atinsaUnread = 2,
}) => {
  const tabs = [
    ...(isMemberOfLignee
      ? [
          {
            id: "lignee" as NavTab,
            label: "Lignée",
            subtitle: "Arbre",
            icon: GitFork,
          },
        ]
      : []),
    {
      id: "togoun" as NavTab,
      label: "Togoun",
      subtitle: "Communauté",
      icon: Users,
    },
    {
      id: "tognon" as NavTab,
      label: "Tognon",
      subtitle: "Vidéos",
      icon: PlaySquare,
    },
    {
      id: "atinsa" as NavTab,
      label: "Atinsa",
      subtitle: "Messages",
      icon: MessageCircle,
      badge: atinsaUnread,
    },
    {
      id: "outils" as NavTab,
      label: "Outils",
      subtitle: "Boîte",
      icon: Wrench,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-thron-border shadow-lg md:max-w-md md:left-1/2 md:-translate-x-1/2 md:rounded-t-2xl">
      <div className="flex items-center justify-around px-2 py-1.5 safe-area-bottom">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 min-w-[56px] min-h-[48px] rounded-xl transition-all duration-200 ${
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
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 px-1 min-w-[16px] h-4 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 leading-none ${
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
