"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VideoPopupContextType {
  openVideoPopup: (videoId: string, title: string) => void;
  closeVideoPopup: () => void;
  isOpen: boolean;
  videoId: string;
  title: string;
}

const VideoPopupContext = createContext<VideoPopupContextType | undefined>(undefined);

export function VideoPopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [title, setTitle] = useState('');

  const openVideoPopup = (videoId: string, title: string) => {
    setVideoId(videoId);
    setTitle(title);
    setIsOpen(true);
  };

  const closeVideoPopup = () => {
    setIsOpen(false);
  };

  return (
    <VideoPopupContext.Provider 
      value={{ 
        openVideoPopup, 
        closeVideoPopup, 
        isOpen, 
        videoId,
        title
      }}
    >
      {children}
    </VideoPopupContext.Provider>
  );
}

export function useVideoPopup() {
  const context = useContext(VideoPopupContext);
  if (context === undefined) {
    throw new Error('useVideoPopup must be used within a VideoPopupProvider');
  }
  return context;
} 