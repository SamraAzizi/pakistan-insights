// Sample Pakistan data for visualization
// Sources: Pakistan Bureau of Statistics, World Bank, UNESCO

export const provinces = [
  { id: "punjab", name: "Punjab", population: 127000000, area: 205344 },
  { id: "sindh", name: "Sindh", population: 55000000, area: 140914 },
  { id: "kpk", name: "Khyber Pakhtunkhwa", population: 40000000, area: 74521 },
  { id: "balochistan", name: "Balochistan", population: 15000000, area: 347190 },
  { id: "islamabad", name: "Islamabad Capital", population: 2000000, area: 906 },
  { id: "gilgit", name: "Gilgit-Baltistan", population: 2000000, area: 72971 },
  { id: "azad-kashmir", name: "Azad Kashmir", population: 4500000, area: 13297 },
];

export const literacyData = [
  { year: 1981, overall: 26.2, male: 35.0, female: 16.0 },
  { year: 1990, overall: 34.9, male: 45.0, female: 23.0 },
  { year: 1998, overall: 43.9, male: 54.8, female: 32.0 },
  { year: 2005, overall: 50.0, male: 61.0, female: 38.0 },
  { year: 2010, overall: 55.0, male: 66.0, female: 44.0 },
  { year: 2017, overall: 59.0, male: 69.0, female: 48.0 },
  { year: 2023, overall: 62.8, male: 72.5, female: 52.7 },
];

export const provincialLiteracy = [
  { province: "Punjab", male: 71.2, female: 54.8, overall: 63.0 },
  { province: "Sindh", male: 67.5, female: 47.2, overall: 57.8 },
  { province: "KPK", male: 70.8, female: 38.5, overall: 55.0 },
  { province: "Balochistan", male: 54.3, female: 23.1, overall: 40.0 },
  { province: "Islamabad", male: 92.1, female: 86.3, overall: 89.0 },
];

export const educationInfrastructure = [
  { province: "Punjab", schools: 52000, colleges: 1200, universities: 45, studentTeacherRatio: 32 },
  { province: "Sindh", schools: 42000, colleges: 800, universities: 35, studentTeacherRatio: 38 },
  { province: "KPK", schools: 28000, colleges: 450, universities: 22, studentTeacherRatio: 35 },
  { province: "Balochistan", schools: 12000, colleges: 120, universities: 8, studentTeacherRatio: 45 },
];

export const enrollmentTrends = [
  { year: 2015, primary: 22.5, secondary: 8.2, higher: 1.8 },
  { year: 2016, primary: 23.1, secondary: 8.5, higher: 1.9 },
  { year: 2017, primary: 23.8, secondary: 8.9, higher: 2.0 },
  { year: 2018, primary: 24.2, secondary: 9.2, higher: 2.2 },
  { year: 2019, primary: 24.8, secondary: 9.6, higher: 2.4 },
  { year: 2020, primary: 23.5, secondary: 9.0, higher: 2.3 },
  { year: 2021, primary: 24.5, secondary: 9.5, higher: 2.5 },
  { year: 2022, primary: 25.2, secondary: 10.0, higher: 2.7 },
  { year: 2023, primary: 26.0, secondary: 10.5, higher: 2.9 },
];

export const electionData = [
  { year: 1970, party: "PPP", seats: 81, votes: 38.9 },
  { year: 1977, party: "PPP", seats: 155, votes: 58.1 },
  { year: 1988, party: "PPP", seats: 92, votes: 38.5 },
  { year: 1990, party: "IJI", seats: 105, votes: 37.3 },
  { year: 1993, party: "PPP", seats: 86, votes: 37.8 },
  { year: 1997, party: "PML-N", seats: 137, votes: 45.9 },
  { year: 2002, party: "PML-Q", seats: 118, votes: 25.7 },
  { year: 2008, party: "PPP", seats: 87, votes: 30.6 },
  { year: 2013, party: "PML-N", seats: 126, votes: 32.8 },
  { year: 2018, party: "PTI", seats: 149, votes: 31.8 },
  { year: 2024, party: "IND", seats: 101, votes: 28.5 },
];

export const voterTurnout = [
  { year: 1970, turnout: 63.1 },
  { year: 1977, turnout: 54.8 },
  { year: 1988, turnout: 43.1 },
  { year: 1990, turnout: 45.5 },
  { year: 1993, turnout: 40.3 },
  { year: 1997, turnout: 35.4 },
  { year: 2002, turnout: 41.3 },
  { year: 2008, turnout: 44.1 },
  { year: 2013, turnout: 55.0 },
  { year: 2018, turnout: 51.8 },
  { year: 2024, turnout: 47.8 },
];

export const populationData = [
  { year: 1951, population: 33.7, urbanPercent: 17.8 },
  { year: 1961, population: 42.9, urbanPercent: 22.5 },
  { year: 1972, population: 65.3, urbanPercent: 25.4 },
  { year: 1981, population: 84.3, urbanPercent: 28.3 },
  { year: 1998, population: 132.4, urbanPercent: 32.5 },
  { year: 2017, population: 207.8, urbanPercent: 36.4 },
  { year: 2023, population: 241.5, urbanPercent: 38.8 },
];

export const ageDistribution = [
  { ageGroup: "0-14", male: 35.2, female: 33.8 },
  { ageGroup: "15-24", male: 20.1, female: 19.5 },
  { ageGroup: "25-54", male: 33.8, female: 35.2 },
  { ageGroup: "55-64", male: 6.2, female: 6.8 },
  { ageGroup: "65+", male: 4.7, female: 4.7 },
];

export const gdpByProvince = [
  { province: "Punjab", gdp: 59.4, color: "hsl(150, 60%, 35%)" },
  { province: "Sindh", gdp: 27.5, color: "hsl(220, 70%, 50%)" },
  { province: "KPK", gdp: 9.8, color: "hsl(38, 92%, 50%)" },
  { province: "Balochistan", gdp: 3.3, color: "hsl(10, 80%, 60%)" },
];

export const economicIndicators = [
  { year: 2015, gdpGrowth: 4.1, inflation: 4.5, unemployment: 5.9 },
  { year: 2016, gdpGrowth: 4.6, inflation: 2.9, unemployment: 5.8 },
  { year: 2017, gdpGrowth: 5.2, inflation: 4.2, unemployment: 5.9 },
  { year: 2018, gdpGrowth: 5.8, inflation: 3.9, unemployment: 5.8 },
  { year: 2019, gdpGrowth: 1.9, inflation: 6.8, unemployment: 6.2 },
  { year: 2020, gdpGrowth: -0.9, inflation: 10.7, unemployment: 6.9 },
  { year: 2021, gdpGrowth: 5.7, inflation: 8.9, unemployment: 6.3 },
  { year: 2022, gdpGrowth: 6.0, inflation: 12.2, unemployment: 6.2 },
  { year: 2023, gdpGrowth: 0.3, inflation: 29.2, unemployment: 8.5 },
];

export const keyStatistics = {
  population: 241.5,
  literacyRate: 62.8,
  gdpBillion: 376.5,
  provinces: 4,
  districts: 154,
  yearOfIndependence: 1947,
};
