import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PartyFilterContextType {
  selectedParty: string | null;
  setSelectedParty: (party: string | null) => void;
  clearFilter: () => void;
}

const PartyFilterContext = createContext<PartyFilterContextType | undefined>(undefined);

export const PartyFilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedParty, setSelectedParty] = useState<string | null>(null);

  const clearFilter = () => setSelectedParty(null);

  return (
    <PartyFilterContext.Provider value={{ selectedParty, setSelectedParty, clearFilter }}>
      {children}
    </PartyFilterContext.Provider>
  );
};

export const usePartyFilter = () => {
  const context = useContext(PartyFilterContext);
  if (context === undefined) {
    throw new Error('usePartyFilter must be used within a PartyFilterProvider');
  }
  return context;
};
