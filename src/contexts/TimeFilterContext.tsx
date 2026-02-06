import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TimeFilterContextType {
  yearRange: [number, number];
  setYearRange: (range: [number, number]) => void;
  minYear: number;
  maxYear: number;
  resetYearRange: () => void;
}

const MIN_YEAR = 1970;
const MAX_YEAR = 2024;

const TimeFilterContext = createContext<TimeFilterContextType | undefined>(undefined);

export const TimeFilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [yearRange, setYearRange] = useState<[number, number]>([MIN_YEAR, MAX_YEAR]);

  const resetYearRange = () => setYearRange([MIN_YEAR, MAX_YEAR]);

  return (
    <TimeFilterContext.Provider value={{ 
      yearRange, 
      setYearRange, 
      minYear: MIN_YEAR, 
      maxYear: MAX_YEAR,
      resetYearRange 
    }}>
      {children}
    </TimeFilterContext.Provider>
  );
};

export const useTimeFilter = () => {
  const context = useContext(TimeFilterContext);
  if (context === undefined) {
    throw new Error('useTimeFilter must be used within a TimeFilterProvider');
  }
  return context;
};
