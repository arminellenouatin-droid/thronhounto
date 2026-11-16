"use client";

import React from "react";
import { Users, PlaySquare, ShoppingBag, BookOpen, GitFork, Wrench } from "lucide-react";

export type NavTab = "togoun" | "tognon" | "thronhi" | "nouyin" | "lignee" | "outils";

interface BottomNavProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  isMemberOfLignee?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  isMemberOfLignee = true,
}) => {
  const tabs = [
    {
      id: "togoun" as NavTab,
      label: "Togoun",
      subtitle: "thronton",
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
      subtitle: "thronton",
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

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-card md:max-w-xl md:left-1/2 md:-translate-x-1/2 md:bottom-3 md:rounded-2xl md:border">
      <div className="flex items-center justify-around px-2 py-1.5 safe-area-bottom">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2 min-w-[52px] min-h-[48px] rounded-xl transition-all duration-150 btn-press ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-bold"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? "stroke-[2.4px] text-blue-600 scale-105" : "stroke-[1.8px]"
                  }`}
                />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 leading-none ${
                  isActive ? "text-blue-600 font-extrabold" : "text-slate-500"
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0.5 w-4 h-0.5 bg-blue-600 rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
