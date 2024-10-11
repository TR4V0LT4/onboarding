'use client';
import React, { createContext, useState, useContext } from 'react';

type TourContextType = {
  runTour: boolean;
  setRunTour: React.Dispatch<React.SetStateAction<boolean>>;
};

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [runTour, setRunTour] = useState(false);

  return (
    <TourContext.Provider value={{ runTour, setRunTour }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};