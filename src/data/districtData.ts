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
  
  // KPK Districts
  peshawar: { id: 'peshawar', name: 'Peshawar', province: 'KPK', literacyRate: 58, populationDensity: 2900, population: 4269000, area: 1257 },
  mardan: { id: 'mardan', name: 'Mardan', province: 'KPK', literacyRate: 52, populationDensity: 1400, population: 2373000, area: 1632 },
  swat: { id: 'swat', name: 'Swat', province: 'KPK', literacyRate: 48, populationDensity: 420, population: 2309000, area: 5337 },
  abbottabad: { id: 'abbottabad', name: 'Abbottabad', province: 'KPK', literacyRate: 62, populationDensity: 590, population: 1332000, area: 1967 },
  dera_ismail_khan: { id: 'dera_ismail_khan', name: 'D.I. Khan', province: 'KPK', literacyRate: 38, populationDensity: 210, population: 1627000, area: 7326 },
  kohat: { id: 'kohat', name: 'Kohat', province: 'KPK', literacyRate: 44, populationDensity: 340, population: 993000, area: 2545 },
  
  // Balochistan Districts
  quetta: { id: 'quetta', name: 'Quetta', province: 'Balochistan', literacyRate: 52, populationDensity: 410, population: 2275000, area: 2653 },
  gwadar: { id: 'gwadar', name: 'Gwadar', province: 'Balochistan', literacyRate: 38, populationDensity: 15, population: 263000, area: 15216 },
  turbat: { id: 'turbat', name: 'Turbat', province: 'Balochistan', literacyRate: 32, populationDensity: 22, population: 498000, area: 18958 },
  khuzdar: { id: 'khuzdar', name: 'Khuzdar', province: 'Balochistan', literacyRate: 28, populationDensity: 18, population: 802000, area: 35380 },
  sibi: { id: 'sibi', name: 'Sibi', province: 'Balochistan', literacyRate: 34, populationDensity: 25, population: 224000, area: 7796 },
  zhob: { id: 'zhob', name: 'Zhob', province: 'Balochistan', literacyRate: 26, populationDensity: 32, population: 310000, area: 20297 },
  
  // Gilgit-Baltistan
  gilgit: { id: 'gilgit', name: 'Gilgit', province: 'Gilgit-Baltistan', literacyRate: 72, populationDensity: 45, population: 243000, area: 4052 },
  skardu: { id: 'skardu', name: 'Skardu', province: 'Gilgit-Baltistan', literacyRate: 68, populationDensity: 32, population: 335000, area: 10554 },
  hunza: { id: 'hunza', name: 'Hunza', province: 'Gilgit-Baltistan', literacyRate: 95, populationDensity: 28, population: 52000, area: 7900 },
  
  // AJK
  muzaffarabad: { id: 'muzaffarabad', name: 'Muzaffarabad', province: 'AJK', literacyRate: 74, populationDensity: 290, population: 650000, area: 2496 },
  mirpur: { id: 'mirpur', name: 'Mirpur', province: 'AJK', literacyRate: 82, populationDensity: 520, population: 456000, area: 1010 },
  
  // Islamabad
  islamabad: { id: 'islamabad', name: 'Islamabad', province: 'ICT', literacyRate: 88, populationDensity: 2400, population: 2006000, area: 906 },
};

export const provinceColors: Record<string, string> = {
  'Punjab': 'hsl(var(--punjab))',
  'Sindh': 'hsl(var(--sindh))',
  'KPK': 'hsl(var(--kpk))',
  'Balochistan': 'hsl(var(--balochistan))',
  'Gilgit-Baltistan': 'hsl(var(--gb))',
  'AJK': 'hsl(var(--ajk))',
  'ICT': 'hsl(var(--ict))',
};
