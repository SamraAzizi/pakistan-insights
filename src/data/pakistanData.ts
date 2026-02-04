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

// Historical party performance - seats won per election
export const partyPerformanceHistory = [
  { year: 1970, PPP: 81, "PML-N": 0, PTI: 0, Others: 57 },
  { year: 1977, PPP: 155, "PML-N": 0, PTI: 0, Others: 45 },
  { year: 1988, PPP: 92, "PML-N": 54, PTI: 0, Others: 51 },
  { year: 1990, PPP: 45, "PML-N": 72, PTI: 0, Others: 80 },
  { year: 1993, PPP: 86, "PML-N": 72, PTI: 0, Others: 44 },
  { year: 1997, PPP: 18, "PML-N": 137, PTI: 0, Others: 49 },
  { year: 2002, PPP: 63, "PML-N": 14, PTI: 1, Others: 124 },
  { year: 2008, PPP: 87, "PML-N": 66, PTI: 0, Others: 89 },
  { year: 2013, PPP: 33, "PML-N": 126, PTI: 28, Others: 77 },
  { year: 2018, PPP: 43, "PML-N": 64, PTI: 149, Others: 16 },
  { year: 2024, PPP: 54, "PML-N": 75, PTI: 93, Others: 44 },
];

// Historical party vote share percentage per election
export const partyVoteShareHistory = [
  { year: 1970, PPP: 38.9, "PML-N": 0, PTI: 0, Others: 61.1 },
  { year: 1977, PPP: 58.1, "PML-N": 0, PTI: 0, Others: 41.9 },
  { year: 1988, PPP: 38.5, "PML-N": 30.2, PTI: 0, Others: 31.3 },
  { year: 1990, PPP: 36.8, "PML-N": 37.3, PTI: 0, Others: 25.9 },
  { year: 1993, PPP: 37.8, "PML-N": 39.7, PTI: 0, Others: 22.5 },
  { year: 1997, PPP: 21.4, "PML-N": 45.9, PTI: 0, Others: 32.7 },
  { year: 2002, PPP: 25.8, "PML-N": 9.4, PTI: 0.8, Others: 64.0 },
  { year: 2008, PPP: 30.6, "PML-N": 19.6, PTI: 0.1, Others: 49.7 },
  { year: 2013, PPP: 15.2, "PML-N": 32.8, PTI: 16.9, Others: 35.1 },
  { year: 2018, PPP: 13.0, "PML-N": 24.4, PTI: 31.8, Others: 30.8 },
  { year: 2024, PPP: 12.5, "PML-N": 22.8, PTI: 28.5, Others: 36.2 },
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

// Provincial seat distribution per election (National Assembly)
export const provincialSeats = [
  { year: 1970, Punjab: 82, Sindh: 27, KPK: 25, Balochistan: 4 },
  { year: 1977, Punjab: 116, Sindh: 43, KPK: 26, Balochistan: 5 },
  { year: 1988, Punjab: 115, Sindh: 46, KPK: 26, Balochistan: 11 },
  { year: 1990, Punjab: 115, Sindh: 46, KPK: 26, Balochistan: 11 },
  { year: 1993, Punjab: 115, Sindh: 46, KPK: 26, Balochistan: 11 },
  { year: 1997, Punjab: 148, Sindh: 61, KPK: 35, Balochistan: 14 },
  { year: 2002, Punjab: 148, Sindh: 61, KPK: 35, Balochistan: 14 },
  { year: 2008, Punjab: 148, Sindh: 61, KPK: 35, Balochistan: 14 },
  { year: 2013, Punjab: 148, Sindh: 61, KPK: 39, Balochistan: 16 },
  { year: 2018, Punjab: 141, Sindh: 61, KPK: 39, Balochistan: 16 },
  { year: 2024, Punjab: 141, Sindh: 61, KPK: 45, Balochistan: 16 },
];

// Provincial voter turnout per election
export const provincialTurnout = [
  { year: 2013, Punjab: 55.5, Sindh: 52.3, KPK: 58.2, Balochistan: 42.1 },
  { year: 2018, Punjab: 52.1, Sindh: 48.7, KPK: 56.4, Balochistan: 38.9 },
  { year: 2024, Punjab: 48.2, Sindh: 45.1, KPK: 52.8, Balochistan: 35.6 },
];

// Party-wise seats won per province per election
export const partyProvincialSeats = [
  { year: 2013, province: "Punjab", "PML-N": 116, "PTI": 7, "PPP": 3, "Others": 22 },
  { year: 2013, province: "Sindh", "PML-N": 2, "PTI": 1, "PPP": 40, "Others": 18 },
  { year: 2013, province: "KPK", "PML-N": 5, "PTI": 16, "PPP": 2, "Others": 16 },
  { year: 2013, province: "Balochistan", "PML-N": 3, "PTI": 1, "PPP": 0, "Others": 12 },
  { year: 2018, province: "Punjab", "PML-N": 68, "PTI": 66, "PPP": 4, "Others": 3 },
  { year: 2018, province: "Sindh", "PML-N": 1, "PTI": 14, "PPP": 43, "Others": 3 },
  { year: 2018, province: "KPK", "PML-N": 1, "PTI": 32, "PPP": 1, "Others": 5 },
  { year: 2018, province: "Balochistan", "PML-N": 1, "PTI": 4, "PPP": 0, "Others": 11 },
  { year: 2024, province: "Punjab", "PML-N": 84, "PTI": 39, "PPP": 5, "Others": 13 },
  { year: 2024, province: "Sindh", "PML-N": 3, "PTI": 9, "PPP": 45, "Others": 4 },
  { year: 2024, province: "KPK", "PML-N": 2, "PTI": 35, "PPP": 1, "Others": 7 },
  { year: 2024, province: "Balochistan", "PML-N": 1, "PTI": 2, "PPP": 2, "Others": 11 },
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
