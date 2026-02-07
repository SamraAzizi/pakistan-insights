// Unified export utility for downloading all dashboard data as a single package

import { 
  literacyData, 
  provincialLiteracy, 
  educationInfrastructure, 
  enrollmentTrends,
  electionData,
  partyPerformanceHistory,
  partyVoteShareHistory,
  voterTurnout,
  provincialSeats,
  partyProvincialSeats,
  populationData,
  ageDistribution,
  gdpByProvince,
  economicIndicators,
  keyStatistics,
  provinces
} from "@/data/pakistanData";

import { districtData } from "@/data/districtData";
import { ExportMode } from "./bilingualExportUtils";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Mini chart generation utilities for PDF embedding
interface MiniChartConfig {
  type: "bar" | "line" | "area" | "pie";
  data: number[];
  labels?: string[];
  colors?: string[];
  width?: number;
  height?: number;
}

const generateMiniChartCanvas = (config: MiniChartConfig): HTMLCanvasElement => {
  const { type, data, colors = ["#228B22", "#4169E1", "#FFA500", "#DC143C"], width = 180, height = 80 } = config;
  
  const canvas = document.createElement("canvas");
  canvas.width = width * 2; // 2x for retina
  canvas.height = height * 2;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  
  ctx.scale(2, 2);
  
  // Background
  ctx.fillStyle = "#f8f9fa";
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, 4);
  ctx.fill();
  
  const padding = 10;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;
  const maxValue = Math.max(...data);
  
  switch (type) {
    case "bar": {
      const barWidth = chartWidth / data.length - 4;
      data.forEach((value, i) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + i * (barWidth + 4);
        const y = padding + chartHeight - barHeight;
        ctx.fillStyle = colors[i % colors.length];
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      });
      break;
    }
    case "line":
    case "area": {
      const points: [number, number][] = data.map((value, i) => [
        padding + (i / (data.length - 1)) * chartWidth,
        padding + chartHeight - (value / maxValue) * chartHeight
      ]);
      
      if (type === "area") {
        ctx.beginPath();
        ctx.moveTo(padding, padding + chartHeight);
        points.forEach(([x, y]) => ctx.lineTo(x, y));
        ctx.lineTo(padding + chartWidth, padding + chartHeight);
        ctx.closePath();
        ctx.fillStyle = colors[0] + "40"; // 25% opacity
        ctx.fill();
      }
      
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      points.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.strokeStyle = colors[0];
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      
      points.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = colors[0];
        ctx.fill();
      });
      break;
    }
    case "pie": {
      const total = data.reduce((a, b) => a + b, 0);
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(chartWidth, chartHeight) / 2 - 5;
      let currentAngle = -Math.PI / 2;
      
      data.forEach((value, i) => {
        const angle = (value / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, currentAngle, currentAngle + angle);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        currentAngle += angle;
      });
      break;
    }
  }
  
  return canvas;
};

// Field translations for unified export
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
  urbanization: { en: "Urbanization", ur: "شہری کاری" },
  
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
  studentTeacherRatio: { en: "Student:Teacher Ratio", ur: "طالب علم:استاد تناسب" },
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
  contribution: { en: "Contribution", ur: "حصہ" },
  
  // Districts
  name: { en: "Name", ur: "نام" },
  area: { en: "Area", ur: "رقبہ" },
  populationDensity: { en: "Population Density", ur: "آبادی کی کثافت" },
  
  // Common
  value: { en: "Value", ur: "قدر" },
  percentage: { en: "Percentage", ur: "فیصد" },
  total: { en: "Total", ur: "کل" },
  average: { en: "Average", ur: "اوسط" },
  id: { en: "ID", ur: "شناخت" },
};

const getHeader = (field: string, mode: ExportMode): string => {
  const translation = fieldTranslations[field];
  if (!translation) return field;
  
  if (mode === "bilingual") return `${translation.en} / ${translation.ur}`;
  if (mode === "urdu") return translation.ur;
  return translation.en;
};

const translateValue = (value: unknown, mode: ExportMode): string => {
  if (typeof value === "string" && fieldTranslations[value]) {
    const trans = fieldTranslations[value];
    if (mode === "bilingual") return `${trans.en} / ${trans.ur}`;
    if (mode === "urdu") return trans.ur;
    return trans.en;
  }
  return String(value ?? "");
};

// Convert data array to CSV section
const dataToCSV = (
  data: Record<string, unknown>[],
  mode: ExportMode
): string => {
  if (data.length === 0) return "";
  
  const headers = Object.keys(data[0]);
  const headerRow = headers.map(h => `"${getHeader(h, mode)}"`).join(",");
  
  const dataRows = data.map(row =>
    headers.map(h => {
      const value = translateValue(row[h], mode);
      if (value.includes(",") || value.includes("/") || value.includes('"')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(",")
  );
  
  return [headerRow, ...dataRows].join("\n");
};

// Build the complete unified report
const buildUnifiedReport = (mode: ExportMode): string => {
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
  
  const sections: string[] = [];
  
  // Report header
  const title = mode === "bilingual" 
    ? "Pakistan Data Atlas - Complete Export / پاکستان ڈیٹا اٹلس - مکمل برآمد"
    : mode === "urdu" 
      ? "پاکستان ڈیٹا اٹلس - مکمل برآمد"
      : "Pakistan Data Atlas - Complete Export";
  
  const dateLabel = mode === "bilingual"
    ? `Generated on / تاریخ: ${dateStr} / ${dateStrUrdu}`
    : mode === "urdu" 
      ? `تاریخ: ${dateStrUrdu}` 
      : `Generated on: ${dateStr}`;
  
  sections.push(`"${title}"`);
  sections.push(`"${dateLabel}"`);
  sections.push(`"Source / ماخذ: Pakistan Bureau of Statistics, Election Commission of Pakistan, World Bank"`);
  sections.push("");
  
  // ========== EDUCATION SECTION ==========
  const eduHeader = mode === "bilingual" 
    ? "=== EDUCATION DATA / تعلیمی ڈیٹا ===" 
    : mode === "urdu" ? "=== تعلیمی ڈیٹا ===" : "=== EDUCATION DATA ===";
  sections.push(`"${eduHeader}"`);
  sections.push("");
  
  // Literacy trends
  const literacyHeader = mode === "bilingual" 
    ? "-- National Literacy Trends / قومی خواندگی کے رجحانات --"
    : mode === "urdu" ? "-- قومی خواندگی کے رجحانات --" : "-- National Literacy Trends --";
  sections.push(`"${literacyHeader}"`);
  sections.push(dataToCSV(literacyData as Record<string, unknown>[], mode));
  sections.push("");
  
  // Provincial literacy
  const provLitHeader = mode === "bilingual"
    ? "-- Provincial Literacy Rates / صوبائی خواندگی کی شرح --"
    : mode === "urdu" ? "-- صوبائی خواندگی کی شرح --" : "-- Provincial Literacy Rates --";
  sections.push(`"${provLitHeader}"`);
  sections.push(dataToCSV(provincialLiteracy as Record<string, unknown>[], mode));
  sections.push("");
  
  // Education infrastructure
  const infraHeader = mode === "bilingual"
    ? "-- Education Infrastructure / تعلیمی انفراسٹرکچر --"
    : mode === "urdu" ? "-- تعلیمی انفراسٹرکچر --" : "-- Education Infrastructure --";
  sections.push(`"${infraHeader}"`);
  sections.push(dataToCSV(educationInfrastructure as Record<string, unknown>[], mode));
  sections.push("");
  
  // Enrollment trends
  const enrollHeader = mode === "bilingual"
    ? "-- Enrollment Trends (millions) / اندراج کے رجحانات (ملین) --"
    : mode === "urdu" ? "-- اندراج کے رجحانات (ملین) --" : "-- Enrollment Trends (millions) --";
  sections.push(`"${enrollHeader}"`);
  sections.push(dataToCSV(enrollmentTrends as Record<string, unknown>[], mode));
  sections.push("");
  
  // ========== ELECTIONS SECTION ==========
  const elecHeader = mode === "bilingual"
    ? "=== ELECTIONS DATA / انتخابی ڈیٹا ==="
    : mode === "urdu" ? "=== انتخابی ڈیٹا ===" : "=== ELECTIONS DATA ===";
  sections.push(`"${elecHeader}"`);
  sections.push("");
  
  // Election results
  const resultsHeader = mode === "bilingual"
    ? "-- Election Results (1970-2024) / انتخابی نتائج (1970-2024) --"
    : mode === "urdu" ? "-- انتخابی نتائج (1970-2024) --" : "-- Election Results (1970-2024) --";
  sections.push(`"${resultsHeader}"`);
  sections.push(dataToCSV(electionData as Record<string, unknown>[], mode));
  sections.push("");
  
  // Party performance history
  const partyPerfHeader = mode === "bilingual"
    ? "-- Party Seats History / پارٹی نشستوں کی تاریخ --"
    : mode === "urdu" ? "-- پارٹی نشستوں کی تاریخ --" : "-- Party Seats History --";
  sections.push(`"${partyPerfHeader}"`);
  sections.push(dataToCSV(partyPerformanceHistory as Record<string, unknown>[], mode));
  sections.push("");
  
  // Vote share history
  const voteShareHeader = mode === "bilingual"
    ? "-- Party Vote Share History (%) / پارٹی ووٹ شیئر تاریخ (%) --"
    : mode === "urdu" ? "-- پارٹی ووٹ شیئر تاریخ (%) --" : "-- Party Vote Share History (%) --";
  sections.push(`"${voteShareHeader}"`);
  sections.push(dataToCSV(partyVoteShareHistory as Record<string, unknown>[], mode));
  sections.push("");
  
  // Voter turnout
  const turnoutHeader = mode === "bilingual"
    ? "-- Voter Turnout (%) / ووٹنگ شرح (%) --"
    : mode === "urdu" ? "-- ووٹنگ شرح (%) --" : "-- Voter Turnout (%) --";
  sections.push(`"${turnoutHeader}"`);
  sections.push(dataToCSV(voterTurnout as Record<string, unknown>[], mode));
  sections.push("");
  
  // Provincial seats
  const provSeatsHeader = mode === "bilingual"
    ? "-- Provincial NA Seats / صوبائی قومی اسمبلی نشستیں --"
    : mode === "urdu" ? "-- صوبائی قومی اسمبلی نشستیں --" : "-- Provincial NA Seats --";
  sections.push(`"${provSeatsHeader}"`);
  sections.push(dataToCSV(provincialSeats as Record<string, unknown>[], mode));
  sections.push("");
  
  // Party provincial breakdown
  const partyProvHeader = mode === "bilingual"
    ? "-- Party-wise Provincial Seats / پارٹی کی صوبائی نشستیں --"
    : mode === "urdu" ? "-- پارٹی کی صوبائی نشستیں --" : "-- Party-wise Provincial Seats --";
  sections.push(`"${partyProvHeader}"`);
  sections.push(dataToCSV(partyProvincialSeats as Record<string, unknown>[], mode));
  sections.push("");
  
  // ========== POPULATION SECTION ==========
  const popHeader = mode === "bilingual"
    ? "=== POPULATION DATA / آبادی کا ڈیٹا ==="
    : mode === "urdu" ? "=== آبادی کا ڈیٹا ===" : "=== POPULATION DATA ===";
  sections.push(`"${popHeader}"`);
  sections.push("");
  
  // Census data
  const censusHeader = mode === "bilingual"
    ? "-- Census & Urbanization Trends / مردم شماری اور شہری کاری کے رجحانات --"
    : mode === "urdu" ? "-- مردم شماری اور شہری کاری کے رجحانات --" : "-- Census & Urbanization Trends --";
  sections.push(`"${censusHeader}"`);
  sections.push(dataToCSV(populationData as Record<string, unknown>[], mode));
  sections.push("");
  
  // Age distribution
  const ageHeader = mode === "bilingual"
    ? "-- Age Distribution (%) / عمر کی تقسیم (%) --"
    : mode === "urdu" ? "-- عمر کی تقسیم (%) --" : "-- Age Distribution (%) --";
  sections.push(`"${ageHeader}"`);
  sections.push(dataToCSV(ageDistribution as Record<string, unknown>[], mode));
  sections.push("");
  
  // Provinces
  const provDataHeader = mode === "bilingual"
    ? "-- Provinces Overview / صوبوں کا جائزہ --"
    : mode === "urdu" ? "-- صوبوں کا جائزہ --" : "-- Provinces Overview --";
  sections.push(`"${provDataHeader}"`);
  sections.push(dataToCSV(provinces as Record<string, unknown>[], mode));
  sections.push("");
  
  // ========== ECONOMY SECTION ==========
  const econHeader = mode === "bilingual"
    ? "=== ECONOMY DATA / معاشی ڈیٹا ==="
    : mode === "urdu" ? "=== معاشی ڈیٹا ===" : "=== ECONOMY DATA ===";
  sections.push(`"${econHeader}"`);
  sections.push("");
  
  // GDP by province
  const gdpHeader = mode === "bilingual"
    ? "-- Provincial GDP Contribution (%) / صوبائی جی ڈی پی حصہ (%) --"
    : mode === "urdu" ? "-- صوبائی جی ڈی پی حصہ (%) --" : "-- Provincial GDP Contribution (%) --";
  sections.push(`"${gdpHeader}"`);
  sections.push(dataToCSV(gdpByProvince as Record<string, unknown>[], mode));
  sections.push("");
  
  // Economic indicators
  const indicatorsHeader = mode === "bilingual"
    ? "-- Economic Indicators / معاشی اشارے --"
    : mode === "urdu" ? "-- معاشی اشارے --" : "-- Economic Indicators --";
  sections.push(`"${indicatorsHeader}"`);
  sections.push(dataToCSV(economicIndicators as Record<string, unknown>[], mode));
  sections.push("");
  
  // ========== DISTRICTS SECTION ==========
  const distHeader = mode === "bilingual"
    ? "=== DISTRICT DATA / اضلاع کا ڈیٹا ==="
    : mode === "urdu" ? "=== اضلاع کا ڈیٹا ===" : "=== DISTRICT DATA ===";
  sections.push(`"${distHeader}"`);
  sections.push("");
  
  const distDataHeader = mode === "bilingual"
    ? "-- District Metrics / اضلاع کے اعداد و شمار --"
    : mode === "urdu" ? "-- اضلاع کے اعداد و شمار --" : "-- District Metrics --";
  sections.push(`"${distDataHeader}"`);
  sections.push(dataToCSV(Object.values(districtData).map(d => ({ ...d })) as Record<string, unknown>[], mode));
  sections.push("");
  
  // ========== KEY STATISTICS SUMMARY ==========
  const summaryHeader = mode === "bilingual"
    ? "=== KEY STATISTICS SUMMARY / اہم اعداد و شمار کا خلاصہ ==="
    : mode === "urdu" ? "=== اہم اعداد و شمار کا خلاصہ ===" : "=== KEY STATISTICS SUMMARY ===";
  sections.push(`"${summaryHeader}"`);
  sections.push("");
  sections.push(dataToCSV([keyStatistics] as Record<string, unknown>[], mode));
  
  return sections.join("\n");
};

// Export unified report as a single CSV file
export const exportUnifiedReport = (mode: ExportMode = "bilingual") => {
  const BOM = "\uFEFF";
  const content = BOM + buildUnifiedReport(mode);
  
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  
  const suffix = mode === "bilingual" ? "_bilingual" : mode === "urdu" ? "_ur" : "_en";
  const timestamp = new Date().toISOString().split("T")[0];
  link.download = `pakistan_data_atlas_complete_${timestamp}${suffix}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};

// Get summary of what's included in the export
export const getExportSummary = (): { domain: string; datasets: string[] }[] => [
  {
    domain: "Education",
    datasets: ["National Literacy Trends", "Provincial Literacy", "Infrastructure", "Enrollment"]
  },
  {
    domain: "Elections", 
    datasets: ["Results 1970-2024", "Party Seats", "Vote Share", "Turnout", "Provincial Breakdown"]
  },
  {
    domain: "Population",
    datasets: ["Census Data", "Age Distribution", "Provinces Overview"]
  },
  {
    domain: "Economy",
    datasets: ["Provincial GDP", "Economic Indicators"]
  },
  {
    domain: "Districts",
    datasets: ["All District Metrics"]
  }
];

// PDF Export functionality

interface PDFTableData {
  title: string;
  headers: string[];
  rows: (string | number)[][];
}

const getPDFTableHeaders = (data: Record<string, unknown>[], mode: ExportMode): string[] => {
  if (data.length === 0) return [];
  return Object.keys(data[0]).map(h => getHeader(h, mode));
};

const getPDFTableRows = (data: Record<string, unknown>[], mode: ExportMode): (string | number)[][] => {
  if (data.length === 0) return [];
  const keys = Object.keys(data[0]);
  return data.map(row => 
    keys.map(k => {
      const val = row[k];
      if (typeof val === "number") return val;
      return translateValue(val, mode);
    })
  );
};

// Calculate summary statistics for key metrics
const calculateSummaryStats = () => {
  const latestLiteracy = literacyData[literacyData.length - 1];
  const latestPopulation = populationData[populationData.length - 1];
  const latestEconomy = economicIndicators[economicIndicators.length - 1];
  const latestElection = electionData[electionData.length - 1];
  
  return {
    literacy: {
      overall: latestLiteracy?.overall || 0,
      male: latestLiteracy?.male || 0,
      female: latestLiteracy?.female || 0,
      genderGap: ((latestLiteracy?.male || 0) - (latestLiteracy?.female || 0)).toFixed(1)
    },
    population: {
      total: latestPopulation?.population || 0,
      urban: latestPopulation?.urbanPercent || 0,
      year: latestPopulation?.year || 2023
    },
    economy: {
      gdpGrowth: latestEconomy?.gdpGrowth || 0,
      inflation: latestEconomy?.inflation || 0,
      year: latestEconomy?.year || 2023
    },
    elections: {
      year: latestElection?.year || 2024,
      totalSeats: latestElection?.seats || 0
    }
  };
};

export const exportUnifiedPDF = (mode: ExportMode = "bilingual") => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = margin;
  
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  });
  
  const primaryColor: [number, number, number] = [34, 139, 34]; // Forest green
  const secondaryColor: [number, number, number] = [60, 60, 60];
  const lightBg: [number, number, number] = [245, 247, 250];
  
  // Helper function to add new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (yPos + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };
  
  // ====== TITLE PAGE ======
  // Header background
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 50, "F");
  
  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  const title = mode === "urdu" 
    ? "Pakistan Data Atlas" 
    : "Pakistan Data Atlas";
  doc.text(title, pageWidth / 2, 25, { align: "center" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  const subtitle = mode === "bilingual" 
    ? "Complete Bilingual Report / Mukammal Duzabani Report"
    : mode === "urdu" 
      ? "Mukammal Report" 
      : "Complete Data Report";
  doc.text(subtitle, pageWidth / 2, 35, { align: "center" });
  
  // Date and source info
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(10);
  yPos = 65;
  doc.text(`Generated: ${dateStr}`, margin, yPos);
  yPos += 6;
  doc.text("Sources: Pakistan Bureau of Statistics, Election Commission of Pakistan, World Bank", margin, yPos);
  
  // ====== EXECUTIVE SUMMARY ======
  yPos += 15;
  doc.setFillColor(...lightBg);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 55, 3, 3, "F");
  
  yPos += 8;
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  const summaryTitle = mode === "bilingual" 
    ? "Executive Summary / Khulasa"
    : mode === "urdu" ? "Khulasa" : "Executive Summary";
  doc.text(summaryTitle, margin + 5, yPos);
  
  const stats = calculateSummaryStats();
  
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  yPos += 10;
  
  const summaryItems = [
    `Population (${stats.population.year}): ${stats.population.total} million | Urbanization: ${stats.population.urban}%`,
    `Literacy Rate: ${stats.literacy.overall}% (Male: ${stats.literacy.male}%, Female: ${stats.literacy.female}%)`,
    `Gender Gap in Literacy: ${stats.literacy.genderGap} percentage points`,
    `Economic Growth (${stats.economy.year}): ${stats.economy.gdpGrowth}% GDP | Inflation: ${stats.economy.inflation}%`,
    `Latest Election (${stats.elections.year}): ${stats.elections.totalSeats} National Assembly Seats`
  ];
  
  summaryItems.forEach(item => {
    doc.text(`• ${item}`, margin + 5, yPos);
    yPos += 6;
  });
  
  // ====== VISUALIZATIONS SECTION ======
  yPos += 15;
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  const vizTitle = mode === "bilingual" 
    ? "Key Visualizations / Aham Graphs"
    : mode === "urdu" ? "Aham Graphs" : "Key Visualizations";
  doc.text(vizTitle, margin, yPos);
  yPos += 10;
  
  // Generate and add mini charts
  const chartConfigs: { title: string; config: MiniChartConfig }[] = [
    {
      title: mode === "bilingual" ? "Literacy Trend / Khandgi" : "Literacy Trend",
      config: {
        type: "area",
        data: literacyData.slice(-8).map(d => d.overall),
        colors: ["#228B22"],
        width: 80,
        height: 50
      }
    },
    {
      title: mode === "bilingual" ? "Provincial GDP / Sobai GDP" : "Provincial GDP",
      config: {
        type: "pie",
        data: gdpByProvince.map(d => d.gdp),
        colors: ["#228B22", "#4169E1", "#FFA500", "#DC143C"],
        width: 80,
        height: 50
      }
    },
    {
      title: mode === "bilingual" ? "Voter Turnout / Voting" : "Voter Turnout",
      config: {
        type: "line",
        data: voterTurnout.slice(-8).map(d => d.turnout),
        colors: ["#4169E1"],
        width: 80,
        height: 50
      }
    },
    {
      title: mode === "bilingual" ? "Population / Aabadi" : "Population",
      config: {
        type: "bar",
        data: populationData.slice(-6).map(d => d.population),
        colors: ["#228B22", "#2E8B57", "#3CB371", "#66CDAA", "#8FBC8F", "#98FB98"],
        width: 80,
        height: 50
      }
    }
  ];
  
  // Draw charts in a 2x2 grid
  const chartWidth = 80;
  const chartHeight = 50;
  const chartGap = 10;
  const labelHeight = 8;
  const startX = margin + 5;
  
  chartConfigs.forEach((chart, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * (chartWidth + chartGap + 15);
    const chartY = yPos + row * (chartHeight + labelHeight + chartGap);
    
    // Chart label
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...secondaryColor);
    doc.text(chart.title, x, chartY);
    
    // Generate chart canvas and add to PDF
    try {
      const canvas = generateMiniChartCanvas(chart.config);
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", x, chartY + 2, chartWidth, chartHeight);
    } catch {
      // Fallback: draw a placeholder box
      doc.setDrawColor(200, 200, 200);
      doc.rect(x, chartY + 2, chartWidth, chartHeight);
      doc.setFontSize(7);
      doc.text("Chart", x + chartWidth / 2 - 8, chartY + chartHeight / 2 + 4);
    }
  });
  
  yPos += 2 * (chartHeight + labelHeight + chartGap) + 10;
  
  // ====== DATA TABLES ======
  const addSectionHeader = (title: string) => {
    checkPageBreak(20);
    yPos += 10;
    doc.setFillColor(...primaryColor);
    doc.rect(margin, yPos, pageWidth - 2 * margin, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin + 3, yPos + 5.5);
    yPos += 15;
  };
  
  const addSubsectionHeader = (title: string) => {
    checkPageBreak(15);
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin, yPos);
    yPos += 5;
  };
  
  const addDataTable = (data: Record<string, unknown>[], maxRows: number = 10) => {
    if (data.length === 0) return;
    
    const headers = getPDFTableHeaders(data, mode);
    const allRows = getPDFTableRows(data, mode);
    const rows = allRows.slice(0, maxRows);
    
    checkPageBreak(30);
    
    autoTable(doc, {
      startY: yPos,
      head: [headers],
      body: rows,
      margin: { left: margin, right: margin },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
        textColor: secondaryColor
      },
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 8
      },
      alternateRowStyles: {
        fillColor: lightBg
      },
      tableLineColor: [200, 200, 200],
      tableLineWidth: 0.1
    });
    
    yPos = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 5;
    
    if (allRows.length > maxRows) {
      doc.setTextColor(120, 120, 120);
      doc.setFontSize(7);
      doc.text(`Showing ${maxRows} of ${allRows.length} records. Full data available in CSV export.`, margin, yPos);
      yPos += 5;
    }
  };
  
  // Start new page for data
  doc.addPage();
  yPos = margin;
  
  // ====== EDUCATION SECTION ======
  const eduTitle = mode === "bilingual" 
    ? "EDUCATION DATA / Taleemi Data" 
    : mode === "urdu" ? "Taleemi Data" : "EDUCATION DATA";
  addSectionHeader(eduTitle);
  
  addSubsectionHeader(mode === "bilingual" ? "National Literacy Trends / Qaumi Khandgi" : "National Literacy Trends");
  addDataTable(literacyData as Record<string, unknown>[], 8);
  
  addSubsectionHeader(mode === "bilingual" ? "Provincial Literacy / Sobai Khandgi" : "Provincial Literacy");
  addDataTable(provincialLiteracy as Record<string, unknown>[], 5);
  
  addSubsectionHeader(mode === "bilingual" ? "Education Infrastructure / Taleemi Infrastructure" : "Education Infrastructure");
  addDataTable(educationInfrastructure as Record<string, unknown>[], 5);
  
  // ====== ELECTIONS SECTION ======
  const elecTitle = mode === "bilingual" 
    ? "ELECTIONS DATA / Intikhabi Data" 
    : mode === "urdu" ? "Intikhabi Data" : "ELECTIONS DATA";
  addSectionHeader(elecTitle);
  
  addSubsectionHeader(mode === "bilingual" ? "Election Results (1970-2024) / Intikhabi Nataij" : "Election Results");
  addDataTable(electionData as Record<string, unknown>[], 10);
  
  addSubsectionHeader(mode === "bilingual" ? "Party Seats History / Party Nashiston ki Tarikh" : "Party Seats History");
  addDataTable(partyPerformanceHistory as Record<string, unknown>[], 8);
  
  addSubsectionHeader(mode === "bilingual" ? "Voter Turnout / Voting Sharah" : "Voter Turnout");
  addDataTable(voterTurnout as Record<string, unknown>[], 10);
  
  // ====== POPULATION SECTION ======
  const popTitle = mode === "bilingual" 
    ? "POPULATION DATA / Aabadi ka Data" 
    : mode === "urdu" ? "Aabadi ka Data" : "POPULATION DATA";
  addSectionHeader(popTitle);
  
  addSubsectionHeader(mode === "bilingual" ? "Census & Urbanization / Mardum Shumari" : "Census & Urbanization");
  addDataTable(populationData as Record<string, unknown>[], 8);
  
  addSubsectionHeader(mode === "bilingual" ? "Age Distribution / Umar ki Taqseem" : "Age Distribution");
  addDataTable(ageDistribution as Record<string, unknown>[], 6);
  
  addSubsectionHeader(mode === "bilingual" ? "Provinces Overview / Sobon ka Jaiza" : "Provinces Overview");
  addDataTable(provinces as Record<string, unknown>[], 5);
  
  // ====== ECONOMY SECTION ======
  const econTitle = mode === "bilingual" 
    ? "ECONOMY DATA / Mashi Data" 
    : mode === "urdu" ? "Mashi Data" : "ECONOMY DATA";
  addSectionHeader(econTitle);
  
  addSubsectionHeader(mode === "bilingual" ? "Provincial GDP Contribution / Sobai GDP Hissa" : "Provincial GDP");
  addDataTable(gdpByProvince as Record<string, unknown>[], 6);
  
  addSubsectionHeader(mode === "bilingual" ? "Economic Indicators / Mashi Isharay" : "Economic Indicators");
  addDataTable(economicIndicators as Record<string, unknown>[], 8);
  
  // ====== DISTRICTS SECTION (Summary) ======
  const distTitle = mode === "bilingual" 
    ? "DISTRICT DATA SUMMARY / Azlaa ka Khulasa" 
    : mode === "urdu" ? "Azlaa ka Khulasa" : "DISTRICT DATA SUMMARY";
  addSectionHeader(distTitle);
  
  const districtArray = Object.values(districtData).slice(0, 15);
  addDataTable(districtArray.map(d => ({ ...d })) as Record<string, unknown>[], 15);
  
  // ====== FOOTER on last page ======
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Pakistan Data Atlas - Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: "center" }
    );
  }
  
  // Save the PDF
  const suffix = mode === "bilingual" ? "_bilingual" : mode === "urdu" ? "_ur" : "_en";
  const timestamp = new Date().toISOString().split("T")[0];
  doc.save(`pakistan_data_atlas_${timestamp}${suffix}.pdf`);
};
