import React, { useState } from 'react';
import { districtData, DistrictData } from '@/data/districtData';
import { useProvinceFilter } from '@/contexts/ProvinceFilterContext';

interface TooltipData {
  district: DistrictData;
  x: number;
  y: number;
}

const PakistanMap: React.FC = () => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'literacy' | 'density'>('literacy');
  const { selectedProvince, setSelectedProvince } = useProvinceFilter();

  const getColor = (districtId: string) => {
    const data = districtData[districtId];
    if (!data) return 'hsl(var(--muted))';
    
    const value = selectedMetric === 'literacy' ? data.literacyRate : Math.min(data.populationDensity / 100, 100);
    const intensity = Math.max(0.2, value / 100);
    
    if (selectedMetric === 'literacy') {
      if (value >= 70) return `hsla(142, 76%, 36%, ${intensity})`;
      if (value >= 50) return `hsla(48, 96%, 53%, ${intensity})`;
      return `hsla(0, 84%, 60%, ${intensity})`;
    } else {
      return `hsla(217, 91%, 60%, ${intensity})`;
    }
  };

  const handleMouseEnter = (districtId: string, event: React.MouseEvent) => {
    setHoveredDistrict(districtId);
    const data = districtData[districtId];
    if (data) {
      setTooltip({
        district: data,
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (tooltip) {
      setTooltip(prev => prev ? { ...prev, x: event.clientX, y: event.clientY } : null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredDistrict(null);
    setTooltip(null);
  };

  const handleProvinceClick = (provinceName: string) => {
    if (selectedProvince === provinceName) {
      setSelectedProvince(null);
    } else {
      setSelectedProvince(provinceName);
    }
  };

  const provinces = [
    { id: 'balochistan', name: 'Balochistan', path: 'M 50 280 L 120 200 L 180 180 L 220 220 L 200 300 L 160 350 L 100 380 L 40 340 Z', districts: ['quetta', 'gwadar', 'turbat', 'khuzdar', 'sibi', 'zhob'] },
    { id: 'sindh', name: 'Sindh', path: 'M 200 300 L 260 280 L 300 320 L 320 400 L 280 450 L 220 420 L 180 380 L 160 350 Z', districts: ['karachi', 'hyderabad', 'sukkur', 'larkana', 'nawabshah', 'mirpurkhas'] },
    { id: 'punjab', name: 'Punjab', path: 'M 260 180 L 340 140 L 400 160 L 420 220 L 380 280 L 320 320 L 260 280 L 220 220 Z', districts: ['lahore', 'faisalabad', 'rawalpindi', 'multan', 'gujranwala', 'sialkot', 'bahawalpur', 'sargodha'] },
    { id: 'kpk', name: 'KPK', path: 'M 260 80 L 320 60 L 380 80 L 400 140 L 340 140 L 260 180 L 240 140 Z', districts: ['peshawar', 'mardan', 'swat', 'abbottabad', 'dera_ismail_khan', 'kohat'] },
    { id: 'gilgit', name: 'Gilgit-Baltistan', path: 'M 320 20 L 400 10 L 450 40 L 440 80 L 380 80 L 320 60 Z', districts: ['gilgit', 'skardu', 'hunza'] },
    { id: 'ajk', name: 'AJK', path: 'M 380 80 L 420 70 L 440 100 L 420 130 L 400 140 L 380 100 Z', districts: ['muzaffarabad', 'mirpur'] },
    { id: 'ict', name: 'Islamabad', path: 'M 350 130 L 370 120 L 385 135 L 370 150 L 350 145 Z', districts: ['islamabad'] },
  ];

  // Map province id to display name
  const getProvinceDisplayName = (id: string) => {
    const province = provinces.find(p => p.id === id);
    return province?.name || id;
  };

  const isProvinceSelected = (provinceId: string) => {
    const displayName = getProvinceDisplayName(provinceId);
    return selectedProvince === displayName;
  };

  const isProvinceFiltered = (provinceId: string) => {
    if (!selectedProvince) return false;
    const displayName = getProvinceDisplayName(provinceId);
    return selectedProvince !== displayName;
  };

  // District positions within provinces (simplified layout)
  const districtPositions: Record<string, { x: number; y: number; size: number; province: string }> = {
    // Punjab
    lahore: { x: 365, y: 200, size: 18, province: 'punjab' },
    faisalabad: { x: 330, y: 210, size: 16, province: 'punjab' },
    rawalpindi: { x: 360, y: 155, size: 15, province: 'punjab' },
    multan: { x: 290, y: 260, size: 15, province: 'punjab' },
    gujranwala: { x: 380, y: 180, size: 14, province: 'punjab' },
    sialkot: { x: 395, y: 170, size: 12, province: 'punjab' },
    bahawalpur: { x: 260, y: 290, size: 16, province: 'punjab' },
    sargodha: { x: 320, y: 180, size: 14, province: 'punjab' },
    // Sindh
    karachi: { x: 230, y: 410, size: 20, province: 'sindh' },
    hyderabad: { x: 270, y: 370, size: 14, province: 'sindh' },
    sukkur: { x: 290, y: 330, size: 12, province: 'sindh' },
    larkana: { x: 260, y: 340, size: 11, province: 'sindh' },
    nawabshah: { x: 275, y: 355, size: 11, province: 'sindh' },
    mirpurkhas: { x: 290, y: 385, size: 10, province: 'sindh' },
    // KPK
    peshawar: { x: 300, y: 95, size: 16, province: 'kpk' },
    mardan: { x: 320, y: 105, size: 12, province: 'kpk' },
    swat: { x: 335, y: 75, size: 14, province: 'kpk' },
    abbottabad: { x: 355, y: 110, size: 11, province: 'kpk' },
    dera_ismail_khan: { x: 270, y: 135, size: 13, province: 'kpk' },
    kohat: { x: 285, y: 115, size: 10, province: 'kpk' },
    // Balochistan
    quetta: { x: 130, y: 250, size: 16, province: 'balochistan' },
    gwadar: { x: 60, y: 360, size: 12, province: 'balochistan' },
    turbat: { x: 90, y: 340, size: 13, province: 'balochistan' },
    khuzdar: { x: 140, y: 310, size: 14, province: 'balochistan' },
    sibi: { x: 165, y: 270, size: 11, province: 'balochistan' },
    zhob: { x: 180, y: 220, size: 12, province: 'balochistan' },
    // GB
    gilgit: { x: 365, y: 45, size: 14, province: 'gilgit' },
    skardu: { x: 410, y: 55, size: 13, province: 'gilgit' },
    hunza: { x: 385, y: 30, size: 10, province: 'gilgit' },
    // AJK
    muzaffarabad: { x: 405, y: 95, size: 12, province: 'ajk' },
    mirpur: { x: 415, y: 115, size: 10, province: 'ajk' },
    // ICT
    islamabad: { x: 365, y: 138, size: 10, province: 'ict' },
  };

  return (
    <div className="relative w-full">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <button
          onClick={() => setSelectedMetric('literacy')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedMetric === 'literacy'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Literacy Rate
        </button>
        <button
          onClick={() => setSelectedMetric('density')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedMetric === 'density'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Population Density
        </button>
        
        {selectedProvince && (
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Selected:</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {selectedProvince}
            </span>
            <button
              onClick={() => setSelectedProvince(null)}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-4 text-sm">
        {selectedMetric === 'literacy' ? (
          <>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500/70" />
              <span className="text-muted-foreground">&lt; 50%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500/70" />
              <span className="text-muted-foreground">50-70%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-600/70" />
              <span className="text-muted-foreground">&gt; 70%</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500/20" />
              <span className="text-muted-foreground">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500/50" />
              <span className="text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500/90" />
              <span className="text-muted-foreground">High</span>
            </div>
          </>
        )}
        <div className="ml-auto text-xs text-muted-foreground">
          Click province to filter all charts
        </div>
      </div>

      {/* Map SVG */}
      <svg
        viewBox="0 0 480 480"
        className="w-full max-w-2xl mx-auto"
        onMouseMove={handleMouseMove}
      >
        {/* Background */}
        <rect x="0" y="0" width="480" height="480" fill="hsl(var(--background))" />
        
        {/* Province outlines */}
        {provinces.map((province) => (
          <path
            key={province.id}
            d={province.path}
            fill={isProvinceSelected(province.id) ? 'hsl(var(--primary) / 0.2)' : 'hsl(var(--muted))'}
            stroke={isProvinceSelected(province.id) ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
            strokeWidth={isProvinceSelected(province.id) ? 3 : 2}
            className={`transition-all duration-200 cursor-pointer hover:fill-primary/10 ${
              isProvinceFiltered(province.id) ? 'opacity-30' : 'opacity-100'
            }`}
            onClick={() => handleProvinceClick(province.name)}
          />
        ))}

        {/* District circles */}
        {Object.entries(districtPositions).map(([districtId, pos]) => {
          const isHovered = hoveredDistrict === districtId;
          const data = districtData[districtId];
          const isFiltered = selectedProvince && getProvinceDisplayName(pos.province) !== selectedProvince;
          
          return (
            <g key={districtId} className={`transition-opacity duration-200 ${isFiltered ? 'opacity-20' : 'opacity-100'}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered ? pos.size * 1.3 : pos.size}
                fill={getColor(districtId)}
                stroke={isHovered ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
                strokeWidth={isHovered ? 3 : 1.5}
                className="cursor-pointer transition-all duration-200"
                style={{ filter: isHovered ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'none' }}
                onMouseEnter={(e) => handleMouseEnter(districtId, e)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleProvinceClick(getProvinceDisplayName(pos.province))}
              />
              {pos.size >= 12 && (
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fontSize="8"
                  fill="white"
                  fontWeight="600"
                  className="pointer-events-none select-none"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {data?.literacyRate || ''}%
                </text>
              )}
            </g>
          );
        })}

        {/* Province labels */}
        <text x="100" y="300" className="fill-muted-foreground text-[10px] font-medium pointer-events-none">Balochistan</text>
        <text x="250" y="380" className="fill-muted-foreground text-[10px] font-medium pointer-events-none">Sindh</text>
        <text x="320" y="230" className="fill-muted-foreground text-[10px] font-medium pointer-events-none">Punjab</text>
        <text x="290" y="125" className="fill-muted-foreground text-[10px] font-medium pointer-events-none">KPK</text>
        <text x="375" y="65" className="fill-muted-foreground text-[10px] font-medium pointer-events-none">GB</text>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none bg-card border border-border rounded-xl shadow-xl p-4 min-w-[200px]"
          style={{
            left: tooltip.x + 15,
            top: tooltip.y - 10,
            transform: 'translateY(-50%)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: getColor(tooltip.district.id) }}
            />
            <h4 className="font-display font-semibold text-foreground">{tooltip.district.name}</h4>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{tooltip.district.province}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Literacy Rate</span>
              <span className="text-sm font-semibold text-foreground">{tooltip.district.literacyRate}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full bg-gradient-to-r from-education to-education-glow"
                style={{ width: `${tooltip.district.literacyRate}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-muted-foreground">Pop. Density</span>
              <span className="text-sm font-semibold text-foreground">{tooltip.district.populationDensity.toLocaleString()}/km²</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Population</span>
              <span className="text-sm font-semibold text-foreground">{(tooltip.district.population / 1000000).toFixed(1)}M</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Area</span>
              <span className="text-sm font-semibold text-foreground">{tooltip.district.area.toLocaleString()} km²</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PakistanMap;
