import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProvinceFilterContextType {
  selectedProvince: string | null;
  setSelectedProvince: (province: string | null) => void;
  clearFilter: () => void;
}

const ProvinceFilterContext = createContext<ProvinceFilterContextType | undefined>(undefined);

export const ProvinceFilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const clearFilter = () => setSelectedProvince(null);

  return (
    <ProvinceFilterContext.Provider value={{ selectedProvince, setSelectedProvince, clearFilter }}>
      {children}
    </ProvinceFilterContext.Provider>
  );
};

export const useProvinceFilter = () => {
  const context = useContext(ProvinceFilterContext);
  if (context === undefined) {
    throw new Error('useProvinceFilter must be used within a ProvinceFilterProvider');
  }
  return context;
};
