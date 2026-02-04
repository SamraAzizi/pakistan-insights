import React from 'react';
import { X } from 'lucide-react';
import { useProvinceFilter } from '@/contexts/ProvinceFilterContext';

export const ProvinceFilterBadge: React.FC = () => {
  const { selectedProvince, clearFilter } = useProvinceFilter();

  if (!selectedProvince) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium text-primary">
      <span>Filtering: {selectedProvince}</span>
      <button
        onClick={clearFilter}
        className="p-0.5 hover:bg-primary/20 rounded-full transition-colors"
        aria-label="Clear filter"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
