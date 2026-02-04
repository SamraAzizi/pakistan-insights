export interface DistrictData {
  id: string;
  name: string;
  province: string;
  literacyRate: number;
  populationDensity: number;
  population: number;
  area: number;
}

export const districtData: Record<string, DistrictData> = {
  // Punjab Districts
  lahore: { id: 'lahore', name: 'Lahore', province: 'Punjab', literacyRate: 74, populationDensity: 6300, population: 11126000, area: 1772 },
  faisalabad: { id: 'faisalabad', name: 'Faisalabad', province: 'Punjab', literacyRate: 62, populationDensity: 1900, population: 7873000, area: 5856 },
  rawalpindi: { id: 'rawalpindi', name: 'Rawalpindi', province: 'Punjab', literacyRate: 78, populationDensity: 1100, population: 5405000, area: 5286 },
  multan: { id: 'multan', name: 'Multan', province: 'Punjab', literacyRate: 54, populationDensity: 1200, population: 4745000, area: 3720 },
  gujranwala: { id: 'gujranwala', name: 'Gujranwala', province: 'Punjab', literacyRate: 61, populationDensity: 1500, population: 5014000, area: 3622 },
  sialkot: { id: 'sialkot', name: 'Sialkot', province: 'Punjab', literacyRate: 68, populationDensity: 1100, population: 3893000, area: 3016 },
  bahawalpur: { id: 'bahawalpur', name: 'Bahawalpur', province: 'Punjab', literacyRate: 42, populationDensity: 180, population: 3668000, area: 24830 },
  sargodha: { id: 'sargodha', name: 'Sargodha', province: 'Punjab', literacyRate: 55, populationDensity: 620, population: 3703000, area: 5854 },
  
  // Sindh Districts
  karachi: { id: 'karachi', name: 'Karachi', province: 'Sindh', literacyRate: 81, populationDensity: 8200, population: 14910000, area: 3780 },
  hyderabad: { id: 'hyderabad', name: 'Hyderabad', province: 'Sindh', literacyRate: 63, populationDensity: 570, population: 2199000, area: 5519 },
  sukkur: { id: 'sukkur', name: 'Sukkur', province: 'Sindh', literacyRate: 48, populationDensity: 280, population: 1487000, area: 5165 },
  larkana: { id: 'larkana', name: 'Larkana', province: 'Sindh', literacyRate: 45, populationDensity: 380, population: 1524000, area: 1906 },
  nawabshah: { id: 'nawabshah', name: 'Nawabshah', province: 'Sindh', literacyRate: 44, populationDensity: 320, population: 1612000, area: 4618 },
  mirpurkhas: { id: 'mirpurkhas', name: 'Mirpur Khas', province: 'Sindh', literacyRate: 41, populationDensity: 290, population: 1505000, area: 2925 },
  