// Bilingual export utilities for charts and data

// Field label translations mapping
const fieldTranslations: Record<string, { en: string; ur: string }> = {
  // Years and dates
  year: { en: "Year", ur: "سال" },
  
  // Provinces
  Punjab: { en: "Punjab", ur: "پنجاب" },
  Sindh: { en: "Sindh", ur: "سندھ" },
  KPK: { en: "Khyber Pakhtunkhwa", ur: "خیبر پختونخوا" },
  Balochistan: { en: "Balochistan", ur: "بلوچستان" },
  Islamabad: { en: "Islamabad", ur: "اسلام آباد" },
  province: { en: "Province", ur: "صوبہ" },
  
  // Political parties
  PPP: { en: "PPP", ur: "پی پی پی" },
  "PML-N": { en: "PML-N", ur: "پی ایم ایل ن" },
  PTI: { en: "PTI", ur: "پی ٹی آئی" },
  Others: { en: "Others", ur: "دیگر" },
  party: { en: "Party", ur: "جماعت" },
  
  // Demographics
  population: { en: "Population", ur: "آبادی" },
  male: { en: "Male", ur: "مرد" },
  female: { en: "Female", ur: "خواتین" },
  overall: { en: "Overall", ur: "مجموعی" },
  urban: { en: "Urban", ur: "شہری" },
  rural: { en: "Rural", ur: "دیہی" },
  
  // Age groups
  "0-14": { en: "0-14 years", ur: "0-14 سال" },
  "15-24": { en: "15-24 years", ur: "15-24 سال" },
  "25-54": { en: "25-54 years", ur: "25-54 سال" },
  "55-64": { en: "55-64 years", ur: "55-64 سال" },
  "65+": { en: "65+ years", ur: "65+ سال" },
  ageGroup: { en: "Age Group", ur: "عمر کا گروپ" },
  
  // Education
  literacyRate: { en: "Literacy Rate", ur: "خواندگی کی شرح" },
  literacy: { en: "Literacy", ur: "خواندگی" },
  schools: { en: "Schools", ur: "اسکول" },
  colleges: { en: "Colleges", ur: "کالج" },
  universities: { en: "Universities", ur: "یونیورسٹیز" },
  studentTeacher: { en: "Student:Teacher Ratio", ur: "طالب علم:استاد تناسب" },
  primary: { en: "Primary", ur: "پرائمری" },
  secondary: { en: "Secondary", ur: "سیکنڈری" },
  higher: { en: "Higher Education", ur: "اعلیٰ تعلیم" },
  enrollment: { en: "Enrollment", ur: "اندراج" },
  
  // Elections
  seats: { en: "Seats", ur: "نشستیں" },
  votes: { en: "Votes", ur: "ووٹ" },
  voteShare: { en: "Vote Share", ur: "ووٹ شیئر" },
  turnout: { en: "Turnout", ur: "ووٹنگ شرح" },
  winner: { en: "Winner", ur: "فاتح" },
  efficiency: { en: "Efficiency", ur: "کارکردگی" },
  
  // Economy
  gdp: { en: "GDP", ur: "جی ڈی پی" },
  gdpGrowth: { en: "GDP Growth", ur: "جی ڈی پی نمو" },
  inflation: { en: "Inflation", ur: "افراط زر" },
  unemployment: { en: "Unemployment", ur: "بے روزگاری" },
  sector: { en: "Sector", ur: "شعبہ" },
  
  // Common
  value: { en: "Value", ur: "قدر" },
  percentage: { en: "Percentage", ur: "فیصد" },
  total: { en: "Total", ur: "کل" },
  average: { en: "Average", ur: "اوسط" },
  name: { en: "Name", ur: "نام" },
  area: { en: "Area", ur: "رقبہ" },
  density: { en: "Density", ur: "کثافت" },
};

// Get bilingual header for a field
export const getBilingualHeader = (field: string): string => {
  const translation = fieldTranslations[field];
  if (translation) {
    return `${translation.en} / ${translation.ur}`;
  }
  // Return original if no translation found
  return field;
};

// Get header in specific language
export const getLocalizedHeader = (field: string, language: "en" | "ur"): string => {
  const translation = fieldTranslations[field];
  if (translation) {
    return translation[language];
  }
  return field;
};

// Export modes
export type ExportMode = "bilingual" | "english" | "urdu";

// Generate bilingual CSV with both English and Urdu headers
export const exportBilingualCSV = (
  data: Record<string, unknown>[],
  filename: string,
  mode: ExportMode = "bilingual"
) => {
  if (data.length === 0) return;

  const originalHeaders = Object.keys(data[0]);
  
  let headerRow: string;
  
  if (mode === "bilingual") {
    // Create bilingual headers with both languages
    headerRow = originalHeaders.map(h => getBilingualHeader(h)).join(",");
  } else if (mode === "urdu") {
    headerRow = originalHeaders.map(h => getLocalizedHeader(h, "ur")).join(",");
  } else {
    headerRow = originalHeaders.map(h => getLocalizedHeader(h, "en")).join(",");
  }

  const dataRows = data.map((row) =>
    originalHeaders.map((header) => {
      let value = row[header];
      
      // Translate province/party values in bilingual mode
      if (mode === "bilingual" && typeof value === "string" && fieldTranslations[value]) {
        const trans = fieldTranslations[value];
        value = `${trans.en} / ${trans.ur}`;
      } else if (mode === "urdu" && typeof value === "string" && fieldTranslations[value]) {
        value = fieldTranslations[value].ur;
      }
      
      // Handle values that might contain commas
      if (typeof value === "string" && (value.includes(",") || value.includes("/"))) {
        return `"${value}"`;
      }
      return value;
    }).join(",")
  );

  // Add BOM for proper UTF-8 encoding (especially for Urdu)
  const BOM = "\uFEFF";
  const csvContent = BOM + [headerRow, ...dataRows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  
  const suffix = mode === "bilingual" ? "_bilingual" : mode === "urdu" ? "_ur" : "_en";
  link.download = `${filename}${suffix}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};

// Generate bilingual report with metadata header
export const exportBilingualReport = (
  data: Record<string, unknown>[],
  filename: string,
  reportTitle: { en: string; ur: string },
  mode: ExportMode = "bilingual"
) => {
  if (data.length === 0) return;

  const originalHeaders = Object.keys(data[0]);
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  });
  const dateStrUrdu = now.toLocaleDateString("ur-PK", { 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  });

  // Build report header
  const reportHeader = [
    mode === "bilingual" 
      ? `"${reportTitle.en} / ${reportTitle.ur}"` 
      : mode === "urdu" ? `"${reportTitle.ur}"` : `"${reportTitle.en}"`,
    mode === "bilingual"
      ? `"Pakistan Data Atlas / پاکستان ڈیٹا اٹلس"`
      : mode === "urdu" ? `"پاکستان ڈیٹا اٹلس"` : `"Pakistan Data Atlas"`,
    mode === "bilingual"
      ? `"Generated on / تاریخ: ${dateStr} / ${dateStrUrdu}"`
      : mode === "urdu" ? `"تاریخ: ${dateStrUrdu}"` : `"Generated on: ${dateStr}"`,
    "", // Empty line before data
  ];

  let dataHeaderRow: string;
  
  if (mode === "bilingual") {
    dataHeaderRow = originalHeaders.map(h => `"${getBilingualHeader(h)}"`).join(",");
  } else if (mode === "urdu") {
    dataHeaderRow = originalHeaders.map(h => `"${getLocalizedHeader(h, "ur")}"`).join(",");
  } else {
    dataHeaderRow = originalHeaders.map(h => `"${getLocalizedHeader(h, "en")}"`).join(",");
  }

  const dataRows = data.map((row) =>
    originalHeaders.map((header) => {
      let value = row[header];
      
      // Translate province/party values
      if (mode === "bilingual" && typeof value === "string" && fieldTranslations[value]) {
        const trans = fieldTranslations[value];
        value = `${trans.en} / ${trans.ur}`;
      } else if (mode === "urdu" && typeof value === "string" && fieldTranslations[value]) {
        value = fieldTranslations[value].ur;
      }
      
      if (typeof value === "string" && (value.includes(",") || value.includes("/"))) {
        return `"${value}"`;
      }
      return value;
    }).join(",")
  );

  // Add BOM for proper UTF-8 encoding
  const BOM = "\uFEFF";
  const csvContent = BOM + [...reportHeader, dataHeaderRow, ...dataRows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  
  const suffix = mode === "bilingual" ? "_report_bilingual" : mode === "urdu" ? "_report_ur" : "_report_en";
  link.download = `${filename}${suffix}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};

// Helper to add custom field translations dynamically
export const addFieldTranslation = (
  field: string,
  en: string,
  ur: string
) => {
  fieldTranslations[field] = { en, ur };
};
