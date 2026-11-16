"use client";

import React from "react";
import { TognonVideoFeed, TognonItem } from "./TognonVideoFeed";

export type VideoLiveItem = TognonItem;

interface TogounVideoImmersionViewProps {
  isOpen: boolean;
  onClose: () => void;
  initialVideoId?: string | null;
  currentUser?: {
    nom: string;
    prenom: string;
    photoUrl?: string;
    role?: string;
    lignee?: string;
  } | null;
  onOpenLogin?: () => void;
  onOpenShareModal?: (title: string, url: string) => void;
}

export const TogounVideoImmersionView: React.FC<TogounVideoImmersionViewProps> = ({
  isOpen,
  onClose,
  initialVideoId,
  currentUser,
  onOpenLogin,
  onOpenShareModal,
}) => {
  if (!isOpen) return null;

  return (
    <TognonVideoFeed
      initialVideoId={initialVideoId}
      onClose={onClose}
      currentUser={currentUser}
      onOpenLogin={onOpenLogin}
      onOpenShareModal={onOpenShareModal}
    />
  );
};
